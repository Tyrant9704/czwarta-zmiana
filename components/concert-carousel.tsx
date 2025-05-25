"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const concerts = [
  {
    id: 1,
    title: "Środowa Noc",
    date: "Czerwiec 15, 2025",
    location: "Kantyna laser",
    image: "/kantyna_placeholder.jpg?height=500&width=350",
  },
  {
    id: 2,
    title: "Letnia, Bluesowa Noc",
    date: "Lipiec 10, 2025",
    location: "Będzin Arena",
    image: "/placeholder.svg?height=500&width=350",
  },
  {
    id: 3,
    title: "Przybrzeżny Jam",
    date: "Sierpień 5, 2025",
    location: "Warszawa, Szerokie Bary",
    image: "/placeholder.svg?height=500&width=350",
  },
  {
    id: 4,
    title: "Blues & Bourbon",
    date: "Wrzesień 20, 2025",
    location: "USA, Vintage Lounge",
    image: "/placeholder.svg?height=500&width=350",
  },
]

export function ConcertCarousel() {
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
          {concerts.map((concert) => (
            <div key={concert.id} className="min-w-0 flex-[0_0_100%] pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
              <div className="overflow-hidden rounded-lg border border-[#fd492d] bg-black bg-opacity-50 p-4">
                <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-md">
                  <Image src={concert.image || "/placeholder.svg"} alt={concert.title} fill className="object-cover" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{concert.title}</h3>
                <p className="mb-1 text-[#fd492d]">{concert.date}</p>
                <p className="text-gray-300">{concert.location}</p>
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
        <span className="sr-only">Poprzednia strona</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border-[#fd492d] bg-black bg-opacity-50 text-white hover:bg-[#fd492d]"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Następna strona</span>
      </Button>

      <div className="mt-4 flex justify-center space-x-2">
        {concerts.map((_, index) => (
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
