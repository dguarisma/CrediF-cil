"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQ() {
  return (
    <section className="py-16 bg-neutral dark:bg-gray-800">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary dark:text-primary-foreground">
          Preguntas frecuentes
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium dark:text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800">
          <p className="text-gray-700 dark:text-gray-300">{answer}</p>
        </div>
      )}
    </div>
  )
}

const faqs = [
  {
    question: "¿Cuánto puedo solicitar en mi primer préstamo?",
    answer:
      "En tu primer préstamo puedes solicitar entre $500 y $2,000 MXN. A medida que construyas historial con nosotros, podrás acceder a montos mayores.",
  },
  {
    question: "¿Cuáles son los requisitos para solicitar un préstamo?",
    answer:
      "Necesitas ser mayor de 18 años, tener una identificación oficial vigente, un teléfono celular a tu nombre y una cuenta bancaria donde recibir el dinero.",
  },
  {
    question: "¿Cuánto tiempo tarda en aprobarse mi solicitud?",
    answer:
      "La mayoría de las solicitudes se aprueban en minutos. Una vez aprobada, recibirás el dinero en tu cuenta en menos de 24 horas.",
  },
  {
    question: "¿Qué pasa si no puedo pagar a tiempo?",
    answer:
      "Te recomendamos siempre pagar a tiempo para evitar cargos adicionales. Si prevés que no podrás pagar, contáctanos antes de la fecha de vencimiento para buscar opciones.",
  },
  {
    question: "¿Cómo puedo aumentar mi límite de crédito?",
    answer:
      "Pagando tus préstamos anteriores a tiempo. Cada préstamo pagado puntualmente mejora tu historial y te permite acceder a montos mayores en futuras solicitudes.",
  },
]
