import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by{' '}
            <Link 
              href="https://www.linkedin.com/in/zainachak/" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:text-primary/80 transition-colors duration-200 hover:underline"
            >
              Xaynlaa
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}