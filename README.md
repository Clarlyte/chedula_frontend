# Chedula Frontend

A modern web application built with Next.js, TypeScript, and Tailwind CSS for AI-powered scheduling and equipment rental management.

## ✨ Key Features

- **AI Chat Assistant**: Real-time chat interface for natural language scheduling
- **User Onboarding**: Multi-step onboarding flow for business setup
- **Authentication**: Secure authentication with Supabase Auth
- **Dashboard**: Calendar, customer management, and equipment tracking
- **Real-time Updates**: Live updates via WebSocket connections
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14.1.0
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.3.3
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.4.1
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) 4.5.0
- **Authentication**: [Supabase Auth](https://supabase.com/auth) 2.39.3
- **Real-time Communication**: WebSockets for AI chat interface
- **UI Components**: 
  - [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components
  - [Radix UI](https://www.radix-ui.com/) primitives (used by shadcn/ui)
  - [Lucide React](https://lucide.dev/) for icons
  - Custom components built with Radix UI primitives and Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chedula/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_BASE_URL=ws://localhost:8000
```

## 🚀 Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
frontend/
├── public/          # Static files
├── src/             # Source files
│   ├── app/        # Next.js app directory
│   │   ├── (auth)/ # Authentication pages (login, register, onboarding)
│   │   ├── dashboard/ # Main application pages
│   │   └── globals.css # Global styles
│   ├── components/ # React components
│   │   ├── auth/   # Authentication components
│   │   ├── chat/   # AI chat interface
│   │   ├── ui/     # shadcn/ui components
│   │   └── providers/ # Context providers
│   ├── lib/        # Utility functions and configurations
│   │   ├── websocket.ts # WebSocket client for AI chat
│   │   └── supabase.ts  # Supabase client
│   └── middleware.ts    # Next.js middleware for auth
├── .env.local      # Environment variables (create this)
├── next.config.mjs # Next.js configuration
├── package.json    # Project dependencies
└── tsconfig.json   # TypeScript configuration
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration can be found in `tailwind.config.js`. The project also includes:
- Custom animations via `tailwindcss-animate`
- Utility functions for class name management (`clsx` and `tailwind-merge`)
- Component variants using `class-variance-authority`

## 🔒 Authentication

Authentication is handled through Supabase Auth. The project uses:
- `@supabase/auth-helpers-nextjs` for Next.js integration
- `@supabase/supabase-js` for Supabase client

## 📝 Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (recommended)

## 🚀 Deployment

The application can be deployed to any platform that supports Next.js applications, such as:
- Vercel (recommended)
- Netlify
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 