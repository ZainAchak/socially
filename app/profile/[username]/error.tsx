'use client' // Error boundaries must be Client Components
 
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='min-h-[100%] flex items-center justify-center'>
    <div className='flex flex-col items-center justify-center gap-4'>
      <h2>Failed to load profile page!</h2>
      <Button className='cursor-pointer'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
    </div>
  )
}