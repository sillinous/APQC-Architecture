import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AgentAssistant from '@/components/AgentAssistant'

export const metadata: Metadata = {
  title: 'APQC Strategic Framework | AI Agent Ecosystem',
  description: 'Strategic framework for AI agents aligned with APQC Process Classification Framework. 103 enterprise agents across 13 business process levels.',
  keywords: 'APQC, AI Agents, Process Classification, Enterprise, Business Process, Automation',
  authors: [{ name: 'Sillinous' }],
  openGraph: {
    title: 'APQC Strategic Framework for AI Agents',
    description: 'Enterprise-grade AI agent ecosystem organized by APQC business process levels',
    type: 'website',
  },
}

import { TelemetryProvider } from '@/context/TelemetryContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 antialiased">
        <TelemetryProvider>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
          <AgentAssistant />
        </TelemetryProvider>
      </body>
    </html>
  )
}
