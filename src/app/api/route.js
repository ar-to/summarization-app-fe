import { NextResponse } from "next/server";

export async function GET(req) {
  try {

    if (!req.query.title) {
      throw new Error("No title provided");
    }

    return NextResponse.json({
      success: true,
      message: "Basic API route",
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
