"use client"

import { createBookmark, deleteBookmark, updateBookmark } from "@/app/dashboard/action"
import { BookmarkDialog } from "@/components/ui/dialog"
import { Bookmark, BookmarkFormValues } from "@/types/bookmark"
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react"
import { toast } from "sonner"



type Mode = "create" | "edit"

interface BookmarkDialogContextType {
  openCreate: () => void
  openEdit: (bookmark: Bookmark) => void
  closeDialog: () => void
  handleDelete:(id:string)=>Promise<void>
}

const BookmarkDialogContext =
  createContext<BookmarkDialogContextType | null>(null)

export function useBookmarkDialog() {
  const context = useContext(BookmarkDialogContext)
  if (!context) {
    throw new Error(
      "useBookmarkDialog must be used within BookmarkDialogProvider"
    )
  }
  return context
}

export function BookmarkDialogProvider({
  children,
}: {
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<Mode>("create")
  const [selectedBookmark, setSelectedBookmark] =
    useState<Bookmark | null>(null)

  const [loading , setLoading] = useState(false);


  const openCreate = () => {
    setMode("create")
    setSelectedBookmark(null)
    setOpen(true)
  }

  const openEdit = (bookmark: Bookmark) => {
    setMode("edit")
    setSelectedBookmark(bookmark)
    setOpen(true)
  }

  const closeDialog = () => {
     if (!loading) setOpen(false)
  }

  const handleSubmit = async (data: BookmarkFormValues) => {
   try {
    setLoading(true);
    //  console.log("Submit called")
    if(mode==="create"){
        await createBookmark(data);
        toast.success("Bookmark created successfully.")
    }else{
        await updateBookmark(data)
         toast.success("Bookmark updated successfully.")
    }
      setOpen(false)
   } catch (error) {
    // console.error("Failed to save bookmark:", error);
   toast.error("Something went wrong. Please try again.");
   }finally{
    setLoading(false)
   }
  }
   
  const handleDelete = async (id: string) => {
    try {
      await deleteBookmark(id)
      toast.success("Bookmark deleted successfully.")
    } catch (error) {
      // console.error("Failed to Delete bookmark:", error)
      toast.error("Something went wrong. Please try again.")
      throw error
    }
  }
  return (
    <BookmarkDialogContext.Provider
      value={{ openCreate, openEdit, closeDialog,handleDelete }}
    >
      {children}

      <BookmarkDialog
        open={open}
        mode={mode}
        initialData={selectedBookmark}
        onClose={closeDialog}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </BookmarkDialogContext.Provider>
  )
}
