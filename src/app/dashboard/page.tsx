import Header from "@/components/layout/header";
import Bookmarks from "../../components/bookmarks/bookmarks";
import { createClient } from "@/lib/supabase/server";
import { Bookmark } from "@/types/bookmark";
import { redirect } from "next/navigation";


export default async function Dashboard (){
  const supabase = await createClient()
     const {
    data: { user },
  } = await supabase.auth.getUser()

 

  if(!user){
    redirect('/')
  }
  const { data: bookmarks } = await supabase
  .from("bookmarks")
  .select("*")
  .order("created_at", { ascending: false })
  .returns<Bookmark[]>()

  return <div className="min-h-dvh">
     <Header user={user}/>
  <main className="container mx-auto px-6 py-10">
  <Bookmarks initialBookmarks={bookmarks ?? []}/>
  </main>
  </div>
}