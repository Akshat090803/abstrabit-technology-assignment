import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">


      <h1 className="text-6xl font-bold tracking-tight bg-linear-to-r from-primary to-purple-400 bg-clip-text text-transparent">
        404
      </h1>

      <h2 className="mt-4 text-xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-muted-foreground max-w-md">
        {"The page you're looking for doesn't exist or may have been moved."}
      </p>

      <div className="mt-8">
        <Button asChild className="btn-glow">
          <Link href="/dashboard">
            Go back to Dashboard
          </Link>
        </Button>
      </div>

    </div>
  )
}
