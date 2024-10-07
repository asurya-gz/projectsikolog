// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  // Ambil token dari cookies
  const token = request.cookies.get("token")?.value; // Pastikan untuk mengambil value dari cookie

  // Halaman yang perlu diakses hanya jika sudah login
  const protectedRoutes = ["/Dashboard", "/Profile"];

  // Jika URL saat ini adalah salah satu dari protectedRoutes dan token tidak ada
  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

// Tentukan URL yang perlu dilindungi
export const config = {
  matcher: ["/Dashboard", "/Profile"], // Halaman yang perlu dilindungi
};
