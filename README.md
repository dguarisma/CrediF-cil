# CrediFácil

## Descripción General

CrediFácil es una plataforma financiera inclusiva diseñada para facilitar el acceso a créditos y servicios financieros. Nuestra aplicación web progresiva (PWA) ofrece una experiencia de usuario intuitiva y accesible, con funcionalidades que guían al usuario a través del proceso de solicitud de crédito.

## Características Principales

- **Autenticación de Usuarios**: Sistema completo de registro, inicio de sesión y recuperación de contraseña.
- **Verificación de Identidad**: Proceso de verificación mediante selfie para garantizar la seguridad.
- **Solicitud de Crédito**: Interfaz intuitiva para solicitar préstamos con diferentes opciones.
- **Calculadora de Préstamos**: Herramienta interactiva para calcular cuotas y montos.
- **Educación Financiera**: Sección dedicada a mejorar la educación financiera de los usuarios.
- **Sistema de Gamificación**: Recompensas, niveles y desafíos para incentivar el uso responsable.
- **Notificaciones Push**: Sistema de alertas para mantener informados a los usuarios.
- **Modo Oscuro**: Opción de visualización para mejorar la accesibilidad.
- **Accesibilidad**: Menú de opciones para adaptar la aplicación a diferentes necesidades.
- **Soporte PWA**: Instalable como aplicación en dispositivos móviles y de escritorio.

## Tecnologías Utilizadas

- **Frontend**: Next.js, React, TypeScript
- **Estilos**: Tailwind CSS
- **PWA**: Service Workers, Web Manifest
- **Componentes UI**: Componentes personalizados y shadcn/ui
- **Contextos**: React Context API para gestión de estado

## Estructura del Proyecto

\`\`\`
credifacil/
├── app/                    # Rutas y páginas de la aplicación
│   ├── beneficios/         # Página de beneficios
│   ├── bienvenida/         # Página de bienvenida
│   ├── calculadora/        # Calculadora de préstamos
│   ├── como-funciona/      # Explicación del proceso
│   ├── configuracion/      # Configuración de la cuenta
│   ├── contacto/           # Página de contacto
│   ├── educacion/          # Educación financiera
│   ├── faq/                # Preguntas frecuentes
│   ├── legal/              # Términos y condiciones
│   ├── login/              # Inicio de sesión
│   ├── metodos-pago/       # Métodos de pago
│   ├── notificaciones/     # Centro de notificaciones
│   ├── pagos/              # Historial de pagos
│   ├── perfil/             # Perfil de usuario
│   ├── recuperar-contrasena/ # Recuperación de contraseña
│   ├── registro/           # Registro de usuario
│   ├── solicitar/          # Solicitud de crédito
│   ├── verificacion/       # Verificación de identidad
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página principal
├── components/             # Componentes reutilizables
│   ├── onboarding/         # Componentes de onboarding
│   ├── tutorial/           # Componentes de tutorial
│   ├── ui/                 # Componentes de interfaz
│   └── ...                 # Otros componentes
├── contexts/               # Contextos de React
├── hooks/                  # Hooks personalizados
├── public/                 # Archivos estáticos
│   ├── icons/              # Iconos de la aplicación
│   ├── images/             # Imágenes
│   ├── manifest.json       # Manifest para PWA
│   ├── sw.js               # Service Worker
│   └── register-sw.js      # Registro del Service Worker
├── next.config.mjs         # Configuración de Next.js
└── tailwind.config.ts      # Configuración de Tailwind CSS
\`\`\`

## Instalación y Configuración

1. **Clonar el repositorio**:
   \`\`\`bash
   git clone https://github.com/tu-usuario/credifacil.git
   cd credifacil
   \`\`\`

2. **Instalar dependencias**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Ejecutar en modo desarrollo**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Construir para producción**:
   \`\`\`bash
   npm run build
   \`\`\`

5. **Iniciar en modo producción**:
   \`\`\`bash
   npm start
   \`\`\`

## Contribución

Si deseas contribuir al proyecto, por favor:

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo [Licencia]. Ver el archivo LICENSE para más detalles.

## Contacto

Para más información, contacta a [tu-email@ejemplo.com].
