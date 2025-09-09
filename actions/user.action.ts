"use server"

import { prisma } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"
import { error } from "console"
import { revalidatePath } from "next/cache"

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

export async function getUserByClerkId(clerkId:string) {
    return await prisma.user.findUnique({
        where:{
            clerkId
        },
        include:{
            _count:{
                select:{
                    followers:true,
                    following:true,
                    posts:true
                },
            },
        },
    })
}

export async function getDbUserId() {
    const {userId:clerkId} = await auth()
    if(!clerkId) throw new Error("unauthorized")

    const user = await getUserByClerkId(clerkId)
    if(!user) throw new Error("User not found in DB")
    return user.id
}

export async function getRandomUsers() {
    try {
        const userId = await getDbUserId()
        
        //get 3 random users exlude ourselfs and the users that we already follow
        const randomUsers = await prisma.user.findMany({
        where: {
            id: { not: userId }, // exclude yourself
            followers: {
            none: {
                followerId: userId, // exclude users already followed by me
                    },
                },
            },
            select: {
                id: true,
                name: true,
                username: true,
                image: true,
                _count: {
                select: { followers: true },
                },
            },
            take: 3,
        })
        return randomUsers
    } catch (error) {
        console.error("user.action.ts",error)
        return []
    }
}

export async function toggleFollow(toFollowUserId:string) {
    try {
        const userId = await getDbUserId()
        if(userId === toFollowUserId) return {success:false, error:"You can not follow yourself"}

        const existingFollow = await prisma.follow.findUnique({
            where:{
                followerId_followingId:{
                    followerId:userId,
                    followingId:toFollowUserId
                }
            }
        })
        
       if(existingFollow){
        //unfollow
        const result = await prisma.follow.delete({
            where:{
                followerId_followingId:{
                    followerId: userId,
                    followingId:toFollowUserId
                }
            }
        })
        revalidatePath("/")
        return {success:true, "result":"You have unfollowed"}
       }
       
       else{
        //follow
        const result = await prisma.$transaction([
            prisma.follow.create({
            data:{
                followerId: userId,
                followingId:toFollowUserId
            }}),

            prisma.notification.create({
                data:{
                    userId:userId,
                    recipientId: toFollowUserId,
                    type:"LIKE" // need to be changed to "FOLLOW" as rightnow follows isn't added to schema
                }
            })
        ])
        revalidatePath("/")
        return {success:true, "result":"You have followed"}
       }
        
    } catch (error) {
        console.error("user.actions.ts", error)
        return {success:false,"error":`Failed to follow`}
    }
    
}