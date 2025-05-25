"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { sendEmail } from "@/app/actions/email"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const result = await sendEmail(formData)

      if (result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
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
              required
              className="border-gray-700 bg-gray-900 text-white"
            />
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
              required
              className="border-gray-700 bg-gray-900 text-white"
            />
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
              required
              className="border-gray-700 bg-gray-900 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">
              Wiadomość
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="min-h-[120px] border-gray-700 bg-gray-900 text-white"
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full bg-[#fd492d] text-white hover:bg-[#e53517]">
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
