"use client"

import { useState } from "react"
import { ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FlashcardProps {
  cards: {
    title: string
    content: string
  }[]
  onComplete: () => void
}

export function Flashcard({ cards, onComplete }: FlashcardProps) {
  const [currentCard, setCurrentCard] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setFlipped(false)
      setTimeout(() => {
        setCurrentCard((prev) => prev + 1)
      }, 300)
    } else {
      // Call onComplete when all cards are viewed
      onComplete()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative h-64 w-full perspective">
        <div
          className={`absolute inset-0 rounded-xl shadow-lg bg-white p-6 backface-hidden transition-all duration-500 ${flipped ? "opacity-0 rotate-y-180" : "opacity-100 rotate-y-0"}`}
        >
          <h3 className="text-xl font-bold mb-4">{cards[currentCard].title}</h3>
          <p className="text-gray-600">{cards[currentCard].content}</p>
          <Button
            onClick={() => setFlipped(true)}
            variant="ghost"
            className="absolute bottom-4 right-4 text-primary flex items-center"
          >
            Entendido <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div
          className={`absolute inset-0 rounded-xl shadow-lg bg-accent text-white p-6 backface-hidden transition-all duration-500 ${!flipped ? "opacity-0 rotate-y-180" : "opacity-100 rotate-y-0"}`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Check className="h-12 w-12 mb-4" />
            <p className="text-center font-medium">¡Excelente! Has entendido este concepto.</p>
            <Button onClick={handleNext} variant="outline" className="mt-4 bg-white text-accent hover:bg-white/90">
              {currentCard < cards.length - 1 ? "Siguiente tarjeta" : "Completar"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {cards.map((_, index) => (
          <div key={index} className={`w-2 h-2 rounded-full ${index === currentCard ? "bg-primary" : "bg-gray-300"}`} />
        ))}
      </div>
    </div>
  )
}
