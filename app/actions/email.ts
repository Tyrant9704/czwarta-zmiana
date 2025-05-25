"use server"

import nodemailer from "nodemailer"

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendEmail(formData: FormData) {
  // Validate form data
  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    return {
      success: false,
      error: "Wszystkie pola są wymagane.",
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    return {
      success: false,
      error: "Proszę podać prawidłowy adres email.",
    }
  }

  try {
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

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@czwartazmiana.com",
      to: process.env.EMAIL_TO || "contact@czwartazmiana.com",
      replyTo: formData.email,
      subject: `Formularz kontaktowy: ${formData.subject}`,
      text: `
        Imię: ${formData.name}
        Email: ${formData.email}
        
        Wiadomość:
        ${formData.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #fd492d;">Nowa wiadomość z formularza kontaktowego</h2>
          <p><strong>Od:</strong> ${formData.name} (${formData.email})</p>
          <p><strong>Temat:</strong> ${formData.subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #fd492d;">
            <p>${formData.message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            Ta wiadomość została wysłana z formularza kontaktowego na stronie Czwarta Zmiana.
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
