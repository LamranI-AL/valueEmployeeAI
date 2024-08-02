import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request }); // Récupère le token d'authentification

    const protectedRoutes = [
      // "/chat/profile",
      // "/chat/archive",
      // "/auth",
      // "/chat",
      "/contact",
    ];

    // Vérifie si la route actuelle est protégée
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathName.startsWith(route)
    );

    // Redirection si l'utilisateur n'est pas authentifié et tente d'accéder à une route protégée
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    // Retourne NextResponse.next() pour laisser passer la requête si autorisée
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ req }) {
        // Ce callback peut être personnalisé pour définir la logique d'autorisation
        const token = await getToken({ req });
        return !!token; // Retourne true si l'utilisateur est authentifié
      },
    },
  }
);

export const config = {
  matcher: ["/profile/:path*", "/auth/:path*", "/chat/:path*", "/contact"],
};
