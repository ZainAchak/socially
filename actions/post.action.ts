"use server"

import { prisma } from "@/lib/prisma"
import { getDbUserId } from "./user.action"
import { revalidatePath } from "next/cache"

export async function createPost(Content:string, Imageurl: string) {
    try {
    const userId = await getDbUserId()
    const post = await prisma.post.create({
        data:{
            content:Content,
            image:Imageurl,
            authorId:userId 
        }
    })
    revalidatePath("/")
    return {success:true, post}
    } catch (error) {
        console.error("postaction.ts error", error)
        return {success:false, error:"Failed to create post"}
    }
}