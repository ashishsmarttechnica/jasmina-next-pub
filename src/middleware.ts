import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/verify-otp'];

// Define profile creation routes
const profileCreationRoutes = {
  user: '/user/create-profile',
  company: '/company/create-profile'
};

// Define role-specific routes
const roleBasedRoutes = {
  user: ['/feed', '/user', '/profile', '/settings', '/jobs', '/connections', '/notifications', '/messages'],
  company: ['/company/feed', '/company/profile', '/company/settings', '/company/jobs', '/company/applications', '/company/candidates']
};

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // First handle internationalization
  const response = await intlMiddleware(request);

  // Get the pathname and locale
  const pathname = request.nextUrl.pathname;
  const locale = request.nextUrl.pathname.split('/')[1];
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  const defLoc = routing.defaultLocale;


  // Get user role and authentication status
  const userRole = request.cookies.get('userRole')?.value;
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';

  const safeLocale = locale || defLoc;


  // Handle public routes
  if (publicRoutes.includes(pathWithoutLocale)) {
    // If user is already logged in, redirect to their role-specific home page
    if (isAuthenticated && userRole) {
      if (userRole === 'user') {
        return NextResponse.redirect(new URL(`/${safeLocale}/feed`, request.url));
      } else if (userRole === 'company') {
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
  const profileCreated = request.cookies.get('profileCreated')?.value === 'true';
  const currentPath = pathWithoutLocale;

  // If profile is not created, redirect to appropriate profile creation page
  if (!profileCreated) {
    const profileCreationRoute = profileCreationRoutes[userRole as keyof typeof profileCreationRoutes];
    if (currentPath !== profileCreationRoute) {
      return NextResponse.redirect(new URL(`/${locale}${profileCreationRoute}`, request.url));
    }
    return response;
  }

  // Handle role-based access
  if (userRole === 'user') {
    // Check if user is trying to access company routes
    if (pathWithoutLocale.startsWith('/company')) {
      return NextResponse.redirect(new URL(`/${locale}/feed`, request.url));
    }
    // Check if route is allowed for user
    // if (!roleBasedRoutes.user.includes(pathWithoutLocale)) {
    //   return NextResponse.redirect(new URL(`/${locale}/feed`, request.url));
    // }

    // for job appy page
    const isUserAllowed = roleBasedRoutes.user.some((route) =>
      currentPath === route || currentPath.startsWith(`${route}/`)
    );
    console.log(isUserAllowed, "isUserAllowed")
    if (!isUserAllowed) {
      return NextResponse.redirect(new URL(`/${locale}/feed`, request.url));
    }
  } else if (userRole === 'company') {
    // Check if company is trying to access user routes
    if (!pathWithoutLocale.startsWith('/company')) {
      return NextResponse.redirect(new URL(`/${locale}/company/feed`, request.url));
    }
    // Check if route is allowed for company
    if (!roleBasedRoutes.company.includes(pathWithoutLocale)) {
      return NextResponse.redirect(new URL(`/${locale}/company/feed`, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
