// route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Save to Strapi
    const strapiRes = await fetch("http://localhost:1337/api/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: body,
      }),
    });

    if (!strapiRes.ok) {
      const errorText = await strapiRes.text();
      console.error("Strapi error response:", errorText);
      throw new Error(
        `Failed to store summary in Strapi: ${strapiRes.status} ${strapiRes.statusText}`
      );
    }

    const strapiData = await strapiRes.json();

    return NextResponse.json({
      success: true,
      message: "file uploaded successfully",
      data: strapiData
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error processing request",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
