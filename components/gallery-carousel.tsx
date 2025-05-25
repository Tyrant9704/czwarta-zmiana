"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Band performing on stage",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Close-up of guitar player",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Band members backstage",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Audience at a concert",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Recording session in studio",
  },
]

export function GalleryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {galleryImages.map((image) => (
            <div key={image.id} className="min-w-0 flex-[0_0_100%] pl-4">
              <div className="overflow-hidden rounded-lg border border-[#fd492d] bg-black bg-opacity-50 p-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                  <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border-[#fd492d] bg-black bg-opacity-50 text-white hover:bg-[#fd492d]"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border-[#fd492d] bg-black bg-opacity-50 text-white hover:bg-[#fd492d]"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="mt-4 flex justify-center space-x-2">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              selectedIndex === index ? "bg-[#fd492d]" : "bg-gray-600"
            } transition-colors`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
