// route.js
import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export async function POST(req) {
  try {
    const body = await req.json()

    // Save to Strapi
    const strapiRes = await fetch("http://localhost:1337/api/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: body
      })
    })

    if (!strapiRes.ok) {
      const errorText = await strapiRes.text()
      console.error("Strapi error response:", errorText)
      throw new Error(
        `Failed to store summary in Strapi: ${strapiRes.status} ${strapiRes.statusText}`
      )
    }

    const strapiData = await strapiRes.json()

    return NextResponse.json({
      success: true,
      message: "file uploaded successfully",
      data: strapiData
    })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error processing request",
        error: error.message
      },
      { status: 500 }
    )
  }
}

export async function PUT(req) {
  try {
    const body = await req.json()
    const { documentId, text, promptOverride } = body

    // prompt
    const prompt = promptOverride
      ? `${promptOverride}: ${text}`
      : "summarize the following extracted texts in one sentence: " + text
    const result = await model.generateContent(prompt)
    const summaryText = result.response.text()

    // Save to Strapi
    const strapiRes = await fetch(
      `http://localhost:1337/api/records/${documentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: {
            // strapi does not like the id but other fields are fine
            summarizedText: summaryText
          }
        })
      }
    )

    if (!strapiRes.ok) {
      const errorText = await strapiRes.text()
      console.error("Strapi error response:", errorText)
      throw new Error(
        `Failed to store summary in Strapi: ${strapiRes.status} ${strapiRes.statusText}`
      )
    }

    return NextResponse.json({
      success: true,
      message: "file uploaded successfully",
      Summary: summaryText
    })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error processing request",
        error: error.message
      },
      { status: 500 }
    )
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json()
    const { documentId } = body

    // Save to Strapi
    const strapiRes = await fetch(
      `http://localhost:1337/api/records/${documentId}`,
      {
        method: "DELETE"
      }
    )

    if (!strapiRes.ok) {
      const errorText = await strapiRes.text()
      console.error("Strapi error response:", errorText)
      throw new Error(
        `Failed to delete record in Strapi: ${strapiRes.status} ${strapiRes.statusText}`
      )
    }

    return NextResponse.json({
      success: true,
      message: "file deleted successfully",
      deleted: true
    })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error processing request",
        error: error.message
      },
      { status: 500 }
    )
  }
}
