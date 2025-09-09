import CreatePost from "@/components/CreatePost";
import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import WhoToFollow from "@/components/WhoToFollow";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-13 gap-3">
      <div className="lg:col-span-9">
        {user ? <CreatePost /> : null}
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky h-50 top-25">
        <WhoToFollow />
      </div>
      
    </div>
  );
}
