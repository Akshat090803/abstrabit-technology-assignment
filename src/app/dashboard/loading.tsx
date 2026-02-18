export default function Loading() {
  return (
    <div className="min-h-screen">
  
      <div className="w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          
          <div className="h-5 w-32 bg-muted rounded-md animate-pulse" />

          <div className="flex items-center gap-4">
            <div className="h-9 w-36 bg-muted rounded-md animate-pulse" />
            <div className="h-9 w-9 bg-muted rounded-full animate-pulse" />
          </div>

        </div>
      </div>

      <main className="container mx-auto px-6 py-10">
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">

          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl shadow-lg border border-border bg-card/70 backdrop-blur-sm space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              </div>

              <div className="h-3 w-48 bg-muted rounded animate-pulse" />

              <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                <div className="h-7 w-16 bg-muted rounded-md animate-pulse" />
              </div>
            </div>
          ))}

        </div>
      </main>
    </div>
  )
}
