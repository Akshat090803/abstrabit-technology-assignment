import { BookmarkDialogProvider } from "@/context/bookmarkDialogContext"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BookmarkDialogProvider>
      {children}
    </BookmarkDialogProvider>
  )
}
