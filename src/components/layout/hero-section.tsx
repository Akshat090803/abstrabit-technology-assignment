"use client"

import { Button } from "../ui/button";
import Image from 'next/image'
import { FaGoogle } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client"

export default function HeroSection() {
  const supabase = createClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }
  return (
    <section className="container mx-auto px-20 h-dvh py-10 grid lg:grid-cols-2 gap-16 items-center ">
      <div className="">
       
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground leading-tight">
          Save the web. Find it instantly.
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-lg">
      Smart Bookmark is a clean, distraction-free space to save,
      organize, and rediscover your links — intelligently.
    </p>

      <div className="mt-10">
      <Button className="cursor-pointer" onClick={handleLogin}>
       <FaGoogle className="text-xs" />

        Continue with Google

      </Button>

      <p className="mt-3 text-sm text-muted-foreground">
        Secure sign-in. Your data stays private.
      </p>
    </div>
      </div>

       <div className="flex justify-center">
            <Image
      src="/bookmark-2.png"
      width={350}
      height={350}
      alt="bookmark illustration"
      className="max-w-xl"
    />
  </div>
    </section>
  );
}





