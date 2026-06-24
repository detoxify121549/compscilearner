import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CompSciLearner — Your Path Into Cybersecurity & Software Design',
  description: 'Free guided curriculum for breaking into cybersecurity and software design. Real resources, real progress tracking, real results.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="w-full min-h-screen m-0 p-0 bg-[#06060e] overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: -1 }}>
          <div className="absolute top-[-200px] left-[10%] w-[600px] h-[600px] rounded-full bg-purple-600/[0.06] blur-[180px]" />
          <div className="absolute bottom-[-200px] right-[10%] w-[500px] h-[500px] rounded-full bg-cyan-600/[0.04] blur-[180px]" />
        </div>
        <div className="w-full">
          {children}
        </div>
      </body>
    </html>
  )
}
