"use client"

import { useState } from "react"
import { Bookmark } from "@/types/bookmark"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ExternalLink,
  Pencil,
  Trash2,
  Copy,
  Check,
  Loader2,
} from "lucide-react"
import Image from "next/image"

interface BookmarkCardProps {
  bookmark: Bookmark
  onDelete: (id: string) => void
  onEdit?: (bookmark: Bookmark) => void
}

export default function BookmarkCard({
  bookmark,
  onDelete,
  onEdit,
}: BookmarkCardProps) {
  const [copied, setCopied] = useState(false)
  const [faviconError, setFaviconError] = useState(false)
  const [isDeleting,setIsDeleting]=useState(false)

  const domain = new URL(bookmark.url).hostname
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`

  const formattedDate = new Date(
    bookmark.created_at
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  const handleCopy = async () => {
    await navigator.clipboard.writeText(bookmark.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  const handleDelete = async ()=>{
    try {
      setIsDeleting(true)
      await onDelete?.(bookmark.id)
      
    } catch (error) {
      
    }finally{
      setIsDeleting(false)
    }
  }

  return (
    <Card className="px-4 py-3 border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all">
      
      <div className="flex justify-between items-start gap-3">

        <div className="flex gap-3 flex-1 min-w-0">

         
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border/40">
            {!faviconError ? (
              <Image
                src={faviconUrl}
                alt={domain}
                className="h-4 w-4"
                width={10}
                height={10}
                onError={() => setFaviconError(true)}
              />
            ) : (
              <span className="text-[10px] font-semibold text-muted-foreground">
                {bookmark.title[0].toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-0.5">

            <h3 className="text-sm font-medium truncate">
              {bookmark.title}
            </h3>

            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[11px] text-muted-foreground truncate">
                {domain}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-6 w-6 shrink-0 hover:bg-primary/10"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(bookmark)}
            className="h-7 w-7 hover:bg-primary/10 cursor-pointer"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive text-destructive cursor-pointer"
            disabled={isDeleting}
          >
           {
            isDeleting ?  <Loader2 className="h-3.5 w-3.5 animate-spin" /> :  <Trash2 className="h-3.5 w-3.5" />
           }
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/80">
        
        <span className="text-[10px] text-muted-foreground">
          {formattedDate}
        </span>

        <Button
          size="sm"
          variant="secondary"
          className="h-7 px-2.5 text-xs"
          asChild
        >
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Visit
          </a>
        </Button>
      </div>
    </Card>
  )
}
