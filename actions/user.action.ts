"use server"

import { prisma } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"

export async function syncUser(){
    try{
        const user = await currentUser()
        const {userId} = await auth()

        if(!user || !userId) return

        const existingUser = await prisma.user.findUnique({
            where:{
                clerkId: userId
            }
        })
        if (existingUser) {console.log("Existing User-->",existingUser.name);return existingUser}

        const newUser = await prisma.user.create({
            data: {
                clerkId: userId,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl
            }
        })
        console.log("New User-->",newUser.name)
        return newUser
    }catch(error){
        console.error("error in user.action.ts",error)
    }

}