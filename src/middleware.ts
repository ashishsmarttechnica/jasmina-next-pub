import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/verify-otp",
  "/post",
  "/post/:postId",
];

// Define profile creation routes
const profileCreationRoutes = {
  user: "/user/create-profile",
  company: ["/company/create-profile", "/company/who-can-see-profile"],
};

// Define shared routes accessible by both user and company
const sharedRoutes = [
  "/chat",
  "/addnotifi",
  "/connections",
  "/single-user",
  "/applicationjob/:id",
  "/company/single-company",
  // "/company/single-company/:id/:subid",
  // "/company/single-company/:id/Profile",
  "/company/single-company/:id/subscription",
  "/company/single-company/:id/applications",
  "/company/single-company/:id/applications/:subid",
  "/company/single-company/:id/previousplans",
];
// Define role-specific routes
const roleBasedRoutes = {
  user: [
    "/feed",
    "/user",
    "/profile",
    "/settings",
    "/jobs",
    "/addnotifi",
    "/messages",
    "/jobs/apply-now/:id/:name",
  ],
  company: [
    "/company/feed",
    "/company/profile",
    "/company/settings",
    "/company/create-job",
    "/company/applications",
    "/company/candidates",
  ],
};

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // First handle internationalization
  const response = await intlMiddleware(request);

  // Get the pathname and locale
  const pathname = request.nextUrl.pathname;
  const locale = request.nextUrl.pathname.split("/")[1];
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  const defLoc = routing.defaultLocale;

  // Get user role and authentication status
  const userRole = request.cookies.get("userRole")?.value?.toLowerCase();
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true";
  const safeLocale = locale || defLoc;

  // Special handling for post/:postId and applicationjob/:id - always allow access
  if (pathWithoutLocale.startsWith("post/")) {
    return response;
  }

  // Handle public routes
  if (publicRoutes.includes(pathWithoutLocale)) {
    // If user is already logged in, redirect to their role-specific home page
    if (isAuthenticated && userRole) {
      if (userRole === "user") {
        return NextResponse.redirect(new URL(`/${safeLocale}/feed`, request.url));
      } else if (userRole === "company") {
        return NextResponse.redirect(new URL(`/${safeLocale}/company/feed`, request.url));
      }
    }
    return response;
  }

  // If not authenticated and trying to access protected route
  if (!isAuthenticated || !userRole) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // Check if profile is created
  const profileCreated = request.cookies.get("profileCreated")?.value === "true";
  const currentPath = pathWithoutLocale;

  // If profile is not created, redirect to appropriate profile creation page
  if (!profileCreated) {
    const profileCreationRoute =
      profileCreationRoutes[userRole as keyof typeof profileCreationRoutes];
    if (Array.isArray(profileCreationRoute)) {
      if (!profileCreationRoute.includes(currentPath)) {
        return NextResponse.redirect(new URL(`/${locale}${profileCreationRoute[0]}`, request.url));
      }
    } else {
      if (currentPath !== profileCreationRoute) {
        return NextResponse.redirect(new URL(`/${locale}${profileCreationRoute}`, request.url));
      }
    }
    return response;
  }

  // Check if the current path is in shared routes
  const isSharedRoute = sharedRoutes.some(
    (route) => currentPath === route || currentPath.startsWith(`${route}/`)
  );

  // If it's a shared route, allow access regardless of role
  if (isSharedRoute) {
    return response;
  }

  // Handle role-based access
  if (userRole === "user") {
    // Check if user is trying to access company routes
    if (pathWithoutLocale.startsWith("/company")) {
      return NextResponse.redirect(new URL(`/${locale}/feed`, request.url));
    }

    // for job apply page
    const isUserAllowed = roleBasedRoutes.user.some(
      (route) => currentPath === route || currentPath.startsWith(`${route}/`)
    );

    if (!isUserAllowed) {
      return NextResponse.redirect(new URL(`/${locale}/feed`, request.url));
    }
  } else if (userRole === "company") {
    // Check if company is trying to access user routes that are not shared
    if (
      !pathWithoutLocale.startsWith("/company") &&
      !pathWithoutLocale.startsWith("/connections") &&
      !pathWithoutLocale.startsWith("/jobs/")
    ) {
      return NextResponse.redirect(new URL(`/${locale}/company/feed`, request.url));
    }

    // Skip permission check for shared routes
    if (isSharedRoute) {
      return response;
    }

    // Check if company is allowed to access this route
    const isCompanyAllowed = roleBasedRoutes.company.some(
      (route) => currentPath === route || currentPath.startsWith(`${route}/`)
    );

    if (!isCompanyAllowed) {
      return NextResponse.redirect(new URL(`/${locale}/company/feed`, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
