"use client"

import { useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ImageIcon, Loader2Icon, SendIcon } from 'lucide-react'
import { createPost } from '@/actions/post.action'
import toast from 'react-hot-toast'

export default function CreatePost() {
    const {user} = useUser()
    const [content, setContent] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [isPosting, setIsPosting] = useState(false)
    const [showImageUpload, setShowImageUpload] = useState(false)

    const handleSubmit = async () => {
      if(!content.trim() && !imageUrl) return
      try{
        setIsPosting(true)
        const result = await createPost(content, imageUrl)

        if(result.success){
          setContent("")
          setImageUrl("")
          setShowImageUpload(false)
          toast.success("Post created successfully")
        }
        else{
          toast.error(result.message || "Failed to create post")
        }

      }catch(error){
        console.error("Create Post",error)
        toast.error("Failed to create post")

      }finally{
        setIsPosting(false)
      }
    }

  return (
    <Card className='mb-6 p-0 dark:bg-black/20 '>
        <CardContent className='pt-4 mb-6 '>
            <div className='space-y-4'>

              {/* Avatar and TextArea */}
                <div className='flex space-x-4'>
                    <Avatar className='w-10 h-10'>
                      <AvatarImage src={user?.imageUrl} />
                    </Avatar>
                    <Textarea
                    className='min-h-[120px] max-h-[130px] resize-none border-none focus-visible:ring-0 p-2 text-base shadow-none'
                      placeholder="What's on your mind?"
                      value={content}
                      onChange={(e)=>{setContent(e.target.value)}}
                      disabled={isPosting}/>
                </div>

              {/* ImageUploads TODO */}

              {/* Upload Photo and Post Button */}
              <div className='flex items-center justify-between border-t pt-4'>
                
                <div className='flex space-x-2'>
                  <Button type='button' 
                          variant={"ghost"} 
                          size={"sm"} 
                          className='text-muted-foreground hover:text-primary cursor-pointer'
                          onClick={()=>setShowImageUpload(!showImageUpload)}
                          disabled={isPosting}>
                    <ImageIcon className='size-4 mr-2'/>
                    Photo
                  </Button>
                </div>

                <Button className='flex items-center cursor-pointer'
                        onClick={handleSubmit}
                        disabled={(!content.trim() && !imageUrl || isPosting)}>
                        {isPosting ? (
                          <>
                            <Loader2Icon className='size-4 mr-2 animate-spin cursor-pointer'/>
                            Posting...
                          </>
                        ):
                          <>
                            <SendIcon className='size-4 mr-2 cursor-pointer'/>
                            Post
                          </>}
                </Button>
              </div>
            </div>
        </CardContent>
    </Card>
  )
}
