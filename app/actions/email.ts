"use server"

import nodemailer from "nodemailer"
import { z } from "zod"
import dns from "dns"
import { promisify } from "util"
import { isDisposableEmail } from "@/lib/disposable-email-checker"

// Promisify DNS lookup functions
const resolveMx = promisify(dns.resolveMx)

// Function to check if email domain exists (has MX records)
async function isEmailDomainValid(email: string): Promise<boolean> {
  try {
    const domain = email.split("@")[1]

    // First check if it's a disposable email domain
    const isDisposable = await isDisposableEmail(email)
    if (isDisposable) {
      return false
    }

    // Then check if domain has MX records
    const mxRecords = await resolveMx(domain)
    return Array.isArray(mxRecords) && mxRecords.length > 0
  } catch (error) {
    // If DNS lookup fails, domain likely doesn't exist
    return false
  }
}

// Server-side validation schema with Polish error messages
const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Imię jest wymagane")
    .max(100, "Imię nie może być dłuższe niż 100 znaków")
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-']+$/, "Imię zawiera niedozwolone znaki")
    .transform(
      (val) =>
        val
          .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width characters
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
          .replace(/\s+/g, " "), // Replace multiple spaces with single space
    ),
  email: z
    .string()
    .trim()
    .email("Podaj prawidłowy adres email")
    .max(254, "Email jest za długi")
    .transform((val) => val.toLowerCase()),
  subject: z
    .string()
    .trim()
    .min(1, "Temat jest wymagany")
    .max(200, "Temat nie może być dłuższy niż 200 znaków")
    .transform((val) =>
      val
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
        .replace(/\s+/g, " "),
    ),
  message: z
    .string()
    .trim()
    .min(10, "Wiadomość musi mieć co najmniej 10 znaków")
    .max(1000, "Wiadomość nie może być dłuższa niż 1000 znaków")
    .transform((val) =>
      val
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
        .replace(/\s+/g, " "),
    ),
})

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendEmail(formData: FormData) {
  try {
    // Validate and sanitize form data using Zod
    const validationResult = ContactFormSchema.safeParse(formData)

    if (!validationResult.success) {
      // Extract the first error message for each field
      const errors = validationResult.error.flatten().fieldErrors
      const firstError = Object.values(errors).find((err) => err && err.length > 0)?.[0]

      return {
        success: false,
        error: firstError || "Dane formularza są nieprawidłowe.",
      }
    }

    // Use the sanitized data from Zod validation
    const sanitizedData = validationResult.data

    // Check if email domain exists and can receive emails
    const isEmailValid = await isEmailDomainValid(sanitizedData.email)
    if (!isEmailValid) {
      return {
        success: false,
        error:
          "Podany adres email wydaje się być nieprawidłowy, tymczasowy lub nie może odbierać wiadomości. Proszę użyć innego adresu email.",
      }
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER || "smtp.gmail.com",
      port: Number.parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Email content with sanitized data
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@czwartazmiana.com",
      to: process.env.EMAIL_TO || "contact@czwartazmiana.com",
      replyTo: sanitizedData.email,
      subject: `Formularz kontaktowy: ${sanitizedData.subject}`,
      text: `
        Imię: ${sanitizedData.name}
        Email: ${sanitizedData.email}
        
        Wiadomość:
        ${sanitizedData.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #fd492d;">Nowa wiadomość z formularza kontaktowego</h2>
          <p><strong>Od:</strong> ${sanitizedData.name} (${sanitizedData.email})</p>
          <p><strong>Temat:</strong> ${sanitizedData.subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #fd492d;">
            <p>${sanitizedData.message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            Ta wiadomość została wysłana z formularza kontaktowego na stronie Czwarta Zmiana.
            <br>
            Email został zweryfikowany pod kątem autentyczności domeny.
          </p>
        </div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
    }
  }
}
