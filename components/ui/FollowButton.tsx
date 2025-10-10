"use client"

import React, { useState } from 'react'
import { Button } from './button'
import toast from 'react-hot-toast'
import { Loader2Icon } from 'lucide-react'
import { toggleFollow } from '@/actions/user.action'

export default function FollowButton({user:toFollowUser}:{user: {id:string, name:string | null}}) {
    const [isLoading, setIsloading] = useState(false)

    async function handleFollow() {
        setIsloading(true)
        try {
            const result =  await toggleFollow(toFollowUser.id)
            if(result.success){
                console.log(result.result)
                toast.success(`${result.result} ${toFollowUser.name || 'User'}`)
            }else{
                console.error(result.error)
                toast.error(`${result.error}`)
            }
        } 
        
        catch (error) {
            console.log("FollowButton.ts",error)
        } 
        
        finally {
            setIsloading(false)
        }
    } 

  return (
    <Button className='cursor-pointer' 
            size={"sm"}
            variant={"secondary"}
            onClick={handleFollow}>
                {isLoading ? <Loader2Icon className='w-4 h-4 animate-spin'/> : "Follow"}
    </Button>
  )
}
