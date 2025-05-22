import { NextResponse, NextRequest } from "next/server";

export function middleware(req : NextRequest )  {

  const url = req.nextUrl;
  const pathname = url.pathname;
  const response = NextResponse.next();

  response.headers.set("x-url", pathname);

  if (pathname === "/moit") {
    return NextResponse.redirect(new URL("/", req.url)); 
  }
  
  if (pathname.startsWith("/api")) {
    const authHeader = req.headers.get("Authorization");
    const secretKey = process.env.API_FIRST_KEY;

    if (!authHeader || authHeader !== `Bearer ${secretKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return response;
}


export const config = {
  matcher: ["/api/:path*", "/moit", "/:path*"], 
};

