"use client"
import { Bookmark } from "@/types/bookmark"
import NoBookMarks from "./no-bookmarks"
import BookmarkCard from "./bookmark"
import { useBookmarkDialog } from "@/context/bookmarkDialogContext"

interface BookmarksProps {
  initialBookmarks: Bookmark[]
}

export default function Bookmarks ({initialBookmarks}:BookmarksProps){
  
  const {openEdit,handleDelete,isDeleting} = useBookmarkDialog()
 
  if(initialBookmarks && !initialBookmarks.length){
    return <NoBookMarks/>
  }
  return <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">

   {
    initialBookmarks.map((bookmark)=>{
      return <BookmarkCard key={bookmark.id} bookmark={bookmark} onDelete={handleDelete} onEdit={openEdit} isDeleting={isDeleting}/>
    })
   }
  </div>
}