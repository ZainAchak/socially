import React from 'react'

export default function loading() {
  return (
    <div className='min-h-[100%] flex items-center justify-center'>
        <div className='h-12 w-12 border-4 border-gray-300 dark:border-gray-900 border-t-gray-900 dark:border-t-gray-300 rounded-full animate-spin' />
    </div>
  )
}
