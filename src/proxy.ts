import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function proxy(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({ name, value, ...options })
        },
        remove: (name, options) => {
          res.cookies.set({ name, value: "", ...options })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthPage = req.nextUrl.pathname === "/"
  const isDashboardRoute =
    req.nextUrl.pathname.startsWith("/dashboard")

  // Not logged in → trying to access dashboard
  if (!user && isDashboardRoute) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Logged in → trying to access login
  if (user && isAuthPage) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    )
  }

  return res
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
}
