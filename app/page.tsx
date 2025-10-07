import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import ModeToggle from "@/components/ModeToggle";
import PostCard from "@/components/PostCard";

import { Button } from "@/components/ui/button";
import WhoToFollow from "@/components/WhoToFollow";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

type Posts = Awaited <ReturnType<typeof getPosts>>
type Post = Posts[number]

export default async function Home() {
  const user = await currentUser()
  const posts = await getPosts()
  const dbUserId = await getDbUserId()
  console.log(posts)
  // if (!user) return
  return (
    <div className="grid grid-cols-1 lg:grid-cols-13 gap-3">
      <div className="lg:col-span-9">
        {user ? <CreatePost /> : null}

        <div className="space-y-6">
          {posts?.map((post:Post)=>(
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky h-50 top-25">
        <WhoToFollow />
      </div>
      
    </div>
  );
}
