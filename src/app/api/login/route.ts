import { serialize } from "cookie";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  // Make a POST request to the Our API

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_O2_API_URL}/api/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  const text = await response.text(); // always safe
  // console.log("Backend raw response:", text);

  if (!response.ok) {
    console.error("❌ Backend returned error status:", response.status);
    return NextResponse.json(
      { message: "Failed to login" },
      { status: response.status }
    );
  }

  let result;
  try {
    result = JSON.parse(text);
    console.log("result:",result)
  } catch (error) {
    console.error("❌ Failed to parse backend JSON:", error);
    return NextResponse.json(
      { message: "Server error: invalid response" },
      { status: 500 }
    );
  }

  // If the request is successful, parse the response body to get the data
  // const data = await response.json();
  const data = result;
  // console.log("result data :", result)
  const user = data.data?.user || null;
  // console.log("user data:",user)
  const accessToken = data.data?.access_token || null;
  // console.log("accessToken data :", accessToken)
  const refreshToken = data.data?.refresh_token;
  // console.log("refresh token data:", refreshToken)

  // Serialize the refresh token and set it as a cookie with
  // (httpOnly, secure, path, and sameSite options) in the response headers to the client-side
  const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
  const serialized = serialize(cookieName, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax", // or "strict" or "none"
  });

  // Return the access token and user data to the client-side
  // with the serialized refresh token as a cookie

  return NextResponse.json(
    {
      accessToken: accessToken,
      user: user,
    },
    {
      status: response.status,
      headers: {
        "Set-Cookie": serialized,
      },
    }
  );
}
