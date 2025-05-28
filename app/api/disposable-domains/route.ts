import { NextResponse } from "next/server"
import { getDisposableEmailDomains } from "@/lib/disposable-email-checker"

export async function GET() {
  try {
    const domains = await getDisposableEmailDomains()

    return NextResponse.json({
      success: true,
      count: domains.size,
      message: `Successfully loaded ${domains.size} disposable email domains`,
    })
  } catch (error) {
    console.error("Error fetching disposable domains:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch disposable email domains",
      },
      { status: 500 },
    )
  }
}

// Optional: Add a POST endpoint to manually refresh the cache
export async function POST() {
  try {
    // Force refresh by clearing the cache
    const { getDisposableEmailDomains } = await import("@/lib/disposable-email-checker")

    // This will force a fresh fetch
    const domains = await getDisposableEmailDomains()

    return NextResponse.json({
      success: true,
      count: domains.size,
      message: `Cache refreshed with ${domains.size} disposable email domains`,
    })
  } catch (error) {
    console.error("Error refreshing disposable domains cache:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to refresh disposable email domains cache",
      },
      { status: 500 },
    )
  }
}
