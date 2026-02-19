"use client"
import { Bookmark } from "@/types/bookmark"
import NoBookMarks from "./no-bookmarks"
import BookmarkCard from "./bookmark"
import { useBookmarkDialog } from "@/context/bookmarkDialogContext"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"


interface BookmarksProps {
  initialBookmarks: Bookmark[]
}

export default function Bookmarks ({initialBookmarks}:BookmarksProps){
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
  const {openEdit,handleDelete} = useBookmarkDialog()
 

useEffect(() => {
  const supabase = createClient()

  let channel: any

  const setupRealtime = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setBookmarks((prev) => [
              payload.new as Bookmark,
              ...prev,
            ])
          }

          if (payload.eventType === "UPDATE") {
            setBookmarks((prev) =>
              prev.map((b) =>
                b.id === payload.new.id
                  ? (payload.new as Bookmark)
                  : b
              )
            )
          }

         if (payload.eventType === "DELETE") {
  const deletedId = payload.old?.id
  if (!deletedId) return

  setBookmarks((prev) =>
    prev.filter((b) => b.id !== deletedId)
  )
}

        }
      )
      .subscribe((status) => {
        // console.log("Subscription status:", status)
      })
  }

  setupRealtime()

  return () => {
    if (channel) supabase.removeChannel(channel)
  }
}, [])






  useEffect(() => {
    setBookmarks(initialBookmarks)
  }, [initialBookmarks])

  if(bookmarks && !bookmarks.length){
    return <NoBookMarks/>
  }
  return <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">

  {bookmarks.map((bookmark) => {
        return (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            onDelete={handleDelete}
            onEdit={openEdit}
         
          />
        )
      })}
  </div>
}