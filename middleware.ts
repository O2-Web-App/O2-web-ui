
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the URL is the root path and redirect to /km
    if (pathname === '/') {
        const response = NextResponse.redirect(new URL('/km', request.url));
        return response;
    }


  // Check for refresh token or any other condition if needed
  const refreshToken = request.cookies.get("normplov-refresh-token");

    if (!refreshToken) {
        console.log("No refresh token found, redirecting to login...");
        return NextResponse.redirect(new URL('login', request.url));
    }

  console.log("Refresh token found, allowing request...");

  return NextResponse.next();
}

// Apply the middleware to the necessary routes
export const config = {
    matcher: ["/:lang/test/all/", "/", "/:lang/test/personality/", "/:lang/test/skill/", "/:lang/test/learningStyle/", "/:lang/test/value/", "/:lang/test/interest/", "/:lang/test-result/all/", "/:lang/test-result/skill/", "/:lang/test-result/learningStyle/", "/:lang/test-result/value/", "/:lang/test-result/interest/",  
       "/:lang/profile-about-user","/:lang/profile-bookmark",
       "/:lang/profile-quiz-history", "/:lang/profile-draft", "/:lang/chat-with-ai/"]
   
};
