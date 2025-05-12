import Image from "next/image"

export function Testimonials() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary dark:text-primary-foreground">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={`/diverse-group-avatars.png?height=48&width=48&query=avatar ${index + 1}`}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">"{testimonial.quote}"</p>
              <div className="flex mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    name: "María García",
    location: "Ciudad de México",
    quote: "CrediFácil me ayudó cuando más lo necesitaba. El proceso fue rápido y sin complicaciones.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    location: "Guadalajara",
    quote: "Excelente servicio. En menos de 24 horas recibí el dinero en mi cuenta. Totalmente recomendado.",
    rating: 4,
  },
  {
    name: "Ana Martínez",
    location: "Monterrey",
    quote: "La mejor opción para préstamos rápidos. La app es muy fácil de usar y el servicio al cliente es excelente.",
    rating: 5,
  },
]
