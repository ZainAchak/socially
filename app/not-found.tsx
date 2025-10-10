'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-100 bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 dark:bg-accent/20 rounded-full blur-3xl animate-pulse delay-700"
          style={{
            transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)`
          }}
        />
        <div 
          className="absolute top-3/4 left-1/3 w-48 h-48 bg-muted/20 dark:bg-muted/30 rounded-full blur-2xl animate-pulse delay-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.008}px, ${mousePosition.y * 0.008}px)`
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 hidden md:block">
        <div className="w-8 h-8 border-2 border-primary/30 rounded-full animate-bounce delay-300" />
      </div>
      <div className="absolute bottom-32 right-16 hidden lg:block">
        <div className="w-6 h-6 bg-accent/40 rounded-full animate-bounce delay-700" />
      </div>
      <div className="absolute top-1/2 left-8 hidden sm:block">
        <div className="w-4 h-4 border border-muted-foreground/40 rotate-45 animate-spin" 
             style={{ animationDuration: '8s' }} />
      </div>

      {/* Main content */}
      <div className="text-center z-10 max-w-2xl mx-auto">
        {/* 404 Number with glitch effect */}
        <div className="relative mb-8 sm:mb-12">
          <h1 className="text-6xl sm:text-7xl lg:text-[12rem] font-bold text-primary/20 dark:text-primary/30 select-none relative">
            404
            <span className="absolute inset-0 text-primary animate-pulse">404</span>
          </h1>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background to-transparent 
                          w-full h-2 top-1/2 transform -translate-y-1/2 animate-[slideGlitch_3s_ease-in-out_infinite]" />
        </div>

        {/* Title and description */}
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground 
                         opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            Oops! Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed
                        opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            The page you're looking for seems to have vanished into the digital void.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center
                        opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
          <Link href="/">
            <Button 
              size="lg" 
              className="w-full sm:w-auto group hover:scale-105 transition-all duration-300
                         shadow-lg hover:shadow-xl"
            >
              <svg 
                className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto group hover:scale-105 transition-all duration-300"
          >
            <svg 
              className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </Button>
        </div>

        {/* Fun interactive element */}
        {/* <div className="mt-12 sm:mt-16 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
          <p className="text-sm text-muted-foreground mb-4">
            Lost? Try moving your mouse around the screen! ✨
          </p>
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  )
}