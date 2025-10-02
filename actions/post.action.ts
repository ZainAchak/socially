"use server"

import { prisma } from "@/lib/prisma"
import { getDbUserId } from "./user.action"
import { revalidatePath } from "next/cache"

export async function createPost(Content:string, Imageurl: string) {
    try {
        const userId = await getDbUserId()
        if (!userId) {
            return { success: false, message: "User not found" }
        }
        const post = await prisma.post.create({
            data: {
                content: Content,
                image: Imageurl,
                authorId: userId
            }
        })

        revalidatePath("/")
        return { success: true, post }
    } catch (error) {
        console.error("Create Post Error", error)
        return { success: false, message: "Failed to create post" }
    }
}