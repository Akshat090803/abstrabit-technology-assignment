"use client";

import { useEffect, useState } from "react";
import { cn, isValidURL } from "@/lib/utils";
import { Input } from "./input";
import { Button } from "./button";
import { Loader2, XCircleIcon } from "lucide-react";
import { Bookmark, BookmarkFormValues } from "@/types/bookmark";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  className?: string;
  mode?: "create" | "edit";
  initialData?: Bookmark | null;
  onSubmit?: (data: BookmarkFormValues) => void;
  loading?: boolean;
}

interface ErrorState {
  url: string;
  title: string;
}

const defaultErrorState = {
  url: "",
  title: "",
};
function BookmarkDialog({
  className,
  open,
  onClose,
  mode = "create",
  initialData,
  onSubmit,
  loading,
}: DialogProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<ErrorState>(defaultErrorState);

  // Prefill when editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title);
      setUrl(initialData.url);
    } else {
      setTitle("");
      setUrl("");
    }

    setError(defaultErrorState)
  }, [mode, initialData, open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   let titleErr:string , urlErr:string;
    if (!title) {
      titleErr="Title is required.";
      setError((prev) => {
        return { ...prev, title: "Title is required." };
      });
    }

    if (!url) {
      urlErr="Url is required." 
      setError((prev) => {
        return { ...prev, url: "Url is required." };
      });
    } else if (!isValidURL(url)) {
      urlErr="Please enter a valid url."
      setError((prev) => {
        return { ...prev, url: "Please enter a valid url." };
      });
    }

    if (titleErr || urlErr) return;

    const bookmark: BookmarkFormValues = {
      id: initialData?.id,
      title,
      url,
    };

    onSubmit?.(bookmark);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-muted-foreground/10 backdrop-blur-sm",
        className,
      )}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-card border border-border shadow-xl rounded-2xl p-6 space-y-6 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">
              {mode === "create" ? "Add Bookmark" : "Edit Bookmark"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === "create"
                ? "Save a new link to your collection"
                : "Update your saved bookmark"}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="cursor-pointer"
          >
            <XCircleIcon className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-0.5">
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError((prev) => {
                  return { ...prev, title: "" };
                });
              }}
              placeholder="Bookmark title"
              className="border border-gray-400"
            />
            <span className="text-xs text-red-500 font-semibold">{error.title}</span>
          </div>

          <div className="space-y-0.5">
            <Input
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError((prev) => {
                  return { ...prev, url: "" };
                });
              }}
              placeholder="https://example.com"
              className="border border-gray-400"
              
            />
            <span className="text-xs text-red-500 font-semibold">{error.url}</span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
              disabled={loading}
            >
              Cancel
            </Button>

            <Button type="submit" className="cursor-pointer" disabled={loading}>
              {mode === "create" ? (
                loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Bookmark"
                )
              ) : loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Bookmark"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { BookmarkDialog };
