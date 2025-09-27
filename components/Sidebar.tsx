import React from 'react'
import { Button } from './ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'
import { Car, Link as LINK, LocateIcon, MapIcon, MapPin, PinIcon } from 'lucide-react'
import { getUserByClerkId } from '@/actions/user.action'
import Link from 'next/link'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'

export default async function Sidebar() {
  const user = await currentUser()
  if(!user) return <UnAuthenticatedSidebar />
  
  const userData = await getUserByClerkId(user.id)
  if(!userData) return null

  const profileSlug = user?.username ?? user?.emailAddresses[0]?.emailAddress?.split("@")[0] ?? "guest"

    
  return (
    <Card className="sticky top-25 shadow-sm">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-full">
            {/* Profile header */}
            <div className="flex flex-col items-center gap-3 border-b border-b-slate-200 dark:border-b-white/20 pb-6">
              <Link href={`/profile/${profileSlug}`}>
                <Avatar className="h-20 w-20 cursor-pointer roune">
                  <AvatarImage src={userData.image || ""} />
                </Avatar>
              </Link>

              <h1 className="text-2xl font-semibold">{userData.name}</h1>
              <h3 className="text-sm text-muted-foreground">@{userData.username}</h3>
              <h2 className="mt-1 text-sm font-medium text-muted-foreground">
                Software Developer @ Joojle
              </h2>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mt-6 border-b border-b-slate-200 dark:border-b-white/20 pb-6">
              <div className="text-center">
                <p className="text-lg font-bold">{userData._count.following}</p>
                <p className="text-sm font-medium text-muted-foreground">Following</p>
              </div>

              <div className="text-center">
                <p className="text-lg font-bold">{userData._count.followers}</p>
                <p className="text-sm font-medium text-muted-foreground">Followers</p>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-col items-start gap-2 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-slate-600" />
                <span>Pakistan</span>
              </span>

              <span className="flex items-center gap-2">
                <LINK size={16} className="text-slate-600" />
                <a
                  href="https://www.zainachak.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary"
                >
                  www.zainachak.com
                </a>
              </span>
            </div>
        </div> 
      </CardContent>
    </Card>
  )
}

const UnAuthenticatedSidebar = () => {
  return (
    <Card className="sticky top-25 shadow-sm">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-full px-2">
            <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Login to access your profile and connect with others
            </p>

            <div className="flex flex-col w-full">
              <SignInButton mode="modal" oauthFlow="auto">
                <Button variant="outline" className="w-full mb-3">
                  Login
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button variant="default" className="w-full">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </div>
      </CardContent>
    </Card>
  )
}
