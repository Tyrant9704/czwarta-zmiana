"use client"

import Image from "next/image"
import Link from "next/link"
import { ConcertCarousel } from "@/components/concert-carousel"
import { GalleryCarousel } from "@/components/gallery-carousel"
import { ContactForm } from "@/components/contact-form"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <section id="home" className="flex min-h-screen flex-col items-center justify-center">
        <div className="container mx-auto flex h-full w-full items-center justify-center">
          {/* Full-width horizontal logo with no background */}
          <div className="relative w-full max-w-6xl aspect-[16/9]">
            <Image
              src="/czwarta-logo.jfif?height=300&width=900"
              alt="Czwarta zmiana Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content wrapper with margins to show background */}
      <div className="mx-auto max-w-[90%]">
        {/* History Section */}
        <section id="history" className="bg-black px-4 py-20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-white font-heading">
              O <span className="text-[#fd492d]">Nas</span>
            </h2>
            <div className="space-y-6 text-gray-300">
              <p>
                Zaczęło się jak u wielu — kilka riffów po godzinach, dym w powietrzu, śmiech i ta potrzeba grania co nie daje spokoju.  
                Część z nas robi na zmiany, a że granie nie pasowało do żadnej z nich - zrobiliśmy swoją zmianę.  
                <span className="text-[#fd492d] font-heading"> Czwartą Zmianę</span>. Tak powstała nazwa która została z nami jak tatuaż
                po dobrej imprezie. Może nieplanowany, ale prawdziwy.
              </p>
              <p>
                Styl? Jakby Nalepa grał z Gibbonsem przy ognisku, a Ronnie Ban Zant polewał dobre whisky. Blues, rock, country, swing —  
                wszystko co płynie z serca, bez zbędnych fajerwerków.  
                Teksty piszemy o tym co znamy. Z życia — z tych poranków, kiedy świat boli w plecach, i z chwil, kiedy jeden uśmiech potrafi postawić na nogi.  
                Z rozmów, co zostają w głowie dłużej niż powinny. O pracy nie śpiewamy — każdy ma ją wystarczająco w kościach.  
                Nie mamy amuletów, ale mamy wspomnienia — z tras, z brudnych prób i z miejsc, które przez chwilę były całym światem.  
                Zagraliśmy już setki razy, ale głód wciąż ten sam. Chcemy więcej scen, więcej twarzy, więcej tych wieczorów po których palce bolą, a dusza tańczy.
              </p>
              <p>
                Dla nas blues to nie tylko muzyka. To coś, co się niesie przez życie jak stary riff - czasem brudny, czasem czysty, ale zawsze prawdziwy.
                Pisząc teksty nie zastanawiamy się, czy to się sprzeda. Pisząc teksty mówimy jak jest. O ludziach których mijamy, o rzeczach które bolą
                i o tych, które radują człowieka, kiedy świat siada na karku. To dźwięki, które nie potrzebują fajerwerków. Wystarczy gitara, szczere słowo
                i ktoś, kto to poczuje. Gramy, bo coś w nas każe grać - i póki się to nie wypali, będziemy podkręcać każdy wers i każdą solówkę tak, jakby 
                miał to być nasz ostatni koncert. A jeśli mielibyśmy coś powiedzieć tym, którzy nas słuchają?
              </p>
              <p>
              <span className="font-bold font-heading text-[#fd492d] text-lg text-2x1"> Carpe Diem</span>
              </p>
              <p>
                Bo wszystko inne może poczekać. Ale dobre granie? Ono się dzieje tu i teraz. I właśnie od tego tu jesteśmy - 
                od <span className="text-[#fd492d] font-heading"> Czwartej Zmiany</span>
              </p>
            </div>
          </div>
        </section>

        {/* Music Section */}
<section id="music" className="bg-black px-4 py-20">
  <div className="container mx-auto max-w-4xl">
    <h2 className="mb-12 text-center text-4xl font-bold text-white font-heading">
      Nasza <span className="text-[#fd492d]">Muzyka</span>
    </h2>

    <div className="rounded-lg border border-[#fd492d] bg-black p-8">
      <p className="mb-6 text-center text-gray-300">Sprawdź nasz najnowszy utwór</p>
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-800">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/OKgp35ioM_8"
              title="ŚWIT - Czwarta Zmiana"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* Concerts Section */}
        <section id="concerts" className="bg-black px-4 py-20">
          <div className="container mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-white font-heading">
              Nadchodzące <span className="text-[#fd492d]">Wydarzenia</span>
            </h2>
            <ConcertCarousel />
          </div>
        </section>

        {/* Gallery Section - Removed red background */}
        <section id="gallery" className="bg-black px-4 py-20">
          <div className="container mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-white font-heading">
              <span className="text-[#fd492d]">Galeria</span>
            </h2>
            <GalleryCarousel />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-black px-4 py-20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-white font-heading">
              Skontaktuj się <span className="text-[#fd492d]">Z nami</span>
            </h2>
            <ContactForm />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black px-4 py-8">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Czwarta zmiana. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 transition-colors hover:text-[#fd492d]" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-[#fd492d]" aria-label="Instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-[#fd492d]" aria-label="YouTube">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
