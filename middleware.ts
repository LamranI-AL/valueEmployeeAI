import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// export
export default withAuth(
  async function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request }); //fait attention a await , parceque je prennd les donenes de client a server side
    const protectedRoutes = ["/profile"];
    const isProtectedRoutes = protectedRoutes.some((route) =>
      pathName.startsWith(route)
    );
    // const isAuthRoute = pathName.startsWith("/auth/signin");
    if (!isAuth && isProtectedRoutes) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);
// matchin : tous les routes dans le matcher sont de protected routes
//fait un truc : c'est que on travaille ici toujour dans server side ; les cookis travaille dans le server side , alore je peut fait les trucs d "admin" ou bien simple utilsateur ...
//
export const config = {
  matcher: ["/profile/:path*", "/auth/:path*"],
};
