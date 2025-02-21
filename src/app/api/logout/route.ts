import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Create a POST request handler for Logout
export async function POST() {
    // Get the refresh token from the client-side cookies
    const cookieName = process.env.COOKIE_REFRESH_TOKEN || "refresh";
    const cookieStore = cookies();
    const credential = (await cookieStore).get(cookieName);
    console.log("creadentail:", credential)
    console.log("cookieStore:", cookieStore)
    console.log("Cookiename:", cookieName)

     // If the refresh token is not found, return an error message to the client-side
     if (!credential) {
        return NextResponse.json(
            {
                message: "Token not found",
            },
            {
                status: 400,
            }
        );
    }

    // get the refresh token value
    const refreshToken = credential.value;

    //If refresh token exist, delete the refresh token from the client-side cookies
    if(refreshToken){
        (await cookieStore).delete(cookieName)

        return NextResponse.json(
            {
                message: "Logout successful",
            },
            {
                status: 200,
            }
        );
    }

     // If the refresh token is not found, return an error message to the client-side
     return NextResponse.json(
        {
            message: "Failed to logout",
        },
        {
            status: 400,
        }
    );

}