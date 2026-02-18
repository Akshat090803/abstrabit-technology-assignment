"use client"

import { BookmarkX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookmarkDialog } from "@/context/bookmarkDialogContext"

interface NoBookMarksProps {
  onCreate?: () => void
}

export default function NoBookMarks({ onCreate }: NoBookMarksProps) {
  
const { openCreate } = useBookmarkDialog()
  return (
    <div className="h-[70vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-sm">
        
        <div className="mx-auto h-20 w-20 rounded-full bg-primary/15 flex items-center justify-center">
          <BookmarkX className="h-8 w-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">
            No bookmarks yet
          </h2>
          <p className="text-sm text-muted-foreground">
            Start saving your favorite links and organize them in one place.
          </p>
        </div>

        <Button
          onClick={openCreate}
          className="cursor-pointer px-6"
        >
          Create your first bookmark
        </Button>
      </div>
    </div>
  )
}
