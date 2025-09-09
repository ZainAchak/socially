"use server"

import { getRandomUsers } from '@/actions/user.action'
import { prisma } from '@/lib/prisma'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import FollowButton from './ui/FollowButton'
import Link from 'next/link'

export default async function WhoToFollow() {
    const users = await getRandomUsers()
    if(users.length === 0) return null

    // console.log("Who to Follow ->",users)
  return (
    
    <Card>
        <CardHeader>
            <CardTitle>Who to Follow</CardTitle>
            <CardDescription>Recommended users</CardDescription>
        </CardHeader>
            
                <CardContent  className='flex flex-col gap-6'>
                    {
                    users.map((user)=>(
                        <div key={user.id} className='flex flex-col gap-1'>
                            <div className='flex gap-3 items-center'>
                                <Link href={`/profile/${user.username}`} target='_blank'>
                                    <Avatar className='h-10 w-10 cursor-pointer'>
                                        <AvatarImage src={user.image || ""}/>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-bold'>{user.name}</h1>
                                    <p className=''>@{user.username}</p>
                                    <p className='font-semibold'>Followers {user._count.followers}</p>
                                </div>
                            </div>
                            <FollowButton user={user}/>
                        </div>
                        ))
                    }
                </CardContent>
            
    </Card>
  )
}
