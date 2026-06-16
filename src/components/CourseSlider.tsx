"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CourseImage {
  src: string
  name: string
  link?: string
}

interface Props {
  images: CourseImage[]
}

export default function CourseSlider({ images }: Props) {
  const [page, setPage] = useState(0)
  const perPage = 8
  const totalPages = Math.ceil(images.length / perPage)
  const current = images.slice(page * perPage, (page + 1) * perPage)
  const touchStart = useRef(0)
  const touchEnd = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPage(prev => (prev + 1) % totalPages)
    }, 5000)
    return () => clearInterval(timer)
  }, [totalPages])

  const prev = () => setPage(p => (p - 1 + totalPages) % totalPages)
  const next = () => setPage(p => (p + 1) % totalPages)

  return (
    <div
      onTouchStart={e => { touchStart.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        touchEnd.current = e.changedTouches[0].clientX
        if (touchStart.current - touchEnd.current > 50) next()
        if (touchEnd.current - touchStart.current > 50) prev()
      }}
    >
      <div className="relative px-10">
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-[#2d5a27] hover:text-white hover:border-[#2d5a27] transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {current.map((img, i) => {
            const card = (
              <div className="group relative w-full rounded-xl overflow-hidden cursor-pointer" style={{ height: '280px' }}>
                <Image
                  src={img.src}
                  alt={img.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold leading-tight">
                    {img.name}
                  </p>
                </div>
              </div>
            )

            return img.link ? (
              <a key={i} href={img.link} target="_blank" rel="noopener noreferrer">
                {card}
              </a>
            ) : (
              <div key={i}>{card}</div>
            )
          })}
        </div>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-[#2d5a27] hover:text-white hover:border-[#2d5a27] transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`transition-all duration-200 rounded-full ${
              i === page
                ? "w-8 h-3 md:h-2 bg-[#2d5a27]"
                : "w-3 h-3 md:w-2 md:h-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      <p className="text-center text-sm text-gray-400 mt-3">
        {page + 1} / {totalPages}
      </p>
    </div>
  )
}
