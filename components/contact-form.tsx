"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { sendEmail } from "@/app/actions/email"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

// Constants for validation
const MAX_MESSAGE_LENGTH = 1000
const MAX_SUBJECT_LENGTH = 200
const MAX_NAME_LENGTH = 100

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState("")

  // Client-side validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email.trim())
  }

  const validateField = (name: string, value: string): string | undefined => {
    const trimmedValue = value.trim()

    switch (name) {
      case "name":
        if (!trimmedValue) return "Imię jest wymagane"
        if (trimmedValue.length > MAX_NAME_LENGTH) return `Imię nie może być dłuższe niż ${MAX_NAME_LENGTH} znaków`
        if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-']+$/.test(trimmedValue)) return "Imię zawiera niedozwolone znaki"
        break
      case "email":
        if (!trimmedValue) return "Email jest wymagany"
        if (!validateEmail(trimmedValue)) return "Podaj prawidłowy adres email"
        break
      case "subject":
        if (!trimmedValue) return "Temat jest wymagany"
        if (trimmedValue.length > MAX_SUBJECT_LENGTH)
          return `Temat nie może być dłuższy niż ${MAX_SUBJECT_LENGTH} znaków`
        break
      case "message":
        if (!trimmedValue) return "Wiadomość jest wymagana"
        if (trimmedValue.length < 10) return "Wiadomość musi mieć co najmniej 10 znaków"
        if (trimmedValue.length > MAX_MESSAGE_LENGTH)
          return `Wiadomość nie może być dłuższa niż ${MAX_MESSAGE_LENGTH} znaków`
        break
    }
    return undefined
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) {
        newErrors[key as keyof FormErrors] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await sendEmail(formData)

      if (result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setErrors({})
      } else {
        setSubmitStatus("error")
        setErrorMessage(result.error || "Nie udało się wysłać wiadomości, spróbuj ponownie.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  const remainingChars = MAX_MESSAGE_LENGTH - formData.message.length

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-white">Informacje Kontaktowe</h3>
          <p className="text-gray-400">
            Skontaktuj się z nami w sprawie rezerwacji, współpracy lub po prostu, aby się przywitać!
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-[#fd492d]" />
            <span className="text-gray-300">contact@czwartazmiana.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-[#fd492d]" />
            <span className="text-gray-300">+48 123 456 789</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-[#fd492d]" />
            <span className="text-gray-300">Mysłowice, Polska</span>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-[#fd492d] bg-black bg-opacity-50 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Imię
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={MAX_NAME_LENGTH}
              required
              className={`border-gray-700 bg-gray-900 text-white ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`border-gray-700 bg-gray-900 text-white ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white">
              Temat
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={MAX_SUBJECT_LENGTH}
              required
              className={`border-gray-700 bg-gray-900 text-white ${errors.subject ? "border-red-500" : ""}`}
            />
            {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="message" className="text-white">
                Wiadomość
              </Label>
              <span className={`text-sm ${remainingChars < 50 ? "text-yellow-500" : "text-gray-400"}`}>
                {remainingChars} znaków pozostało
              </span>
            </div>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={MAX_MESSAGE_LENGTH}
              required
              className={`min-h-[120px] border-gray-700 bg-gray-900 text-white ${errors.message ? "border-red-500" : ""}`}
            />
            {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).some((key) => errors[key as keyof FormErrors])}
            className="w-full bg-[#fd492d] text-white hover:bg-[#e53517] disabled:opacity-50"
          >
            {isSubmitting ? (
              "Wysyłanie..."
            ) : (
              <>
                Wyślij Wiadomość <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {submitStatus === "success" && (
            <p className="text-center text-green-500">
              Wiadomość wysłana, dziękujemy za kontakt, odezwiemy się wkrótce!
            </p>
          )}
          {submitStatus === "error" && <p className="text-center text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </div>
  )
}
