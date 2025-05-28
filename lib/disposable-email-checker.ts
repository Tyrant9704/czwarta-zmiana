// Cache for disposable email domains
let disposableDomainsCache: Set<string> | null = null
let lastFetchTime = 0
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Fallback list in case GitHub fetch fails
const fallbackDisposableEmailDomains = [
  "10minutemail.com",
  "tempmail.com",
  "throwawaymail.com",
  "mailinator.com",
  "guerrillamail.com",
  "sharklasers.com",
  "yopmail.com",
  "trashmail.com",
  "temp-mail.org",
  "fakeinbox.com",
  "getnada.com",
  "mailnesia.com",
  "tempr.email",
  "dispostable.com",
  "maildrop.cc",
  "harakirimail.com",
  "mailcatch.com",
  "spamgourmet.com",
  "incognitomail.com",
  "tempinbox.com",
]

async function fetchDisposableEmailDomains(): Promise<Set<string>> {
  try {
    console.log("Fetching disposable email domains from GitHub...")

    const response = await fetch(
      "https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/main/disposable_email_blocklist.conf",
      {
        // Add cache headers to respect GitHub's caching
        headers: {
          "Cache-Control": "max-age=3600", // 1 hour
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const text = await response.text()

    // Parse the file - each line is a domain
    const domains = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#")) // Remove empty lines and comments
      .map((domain) => domain.toLowerCase())

    console.log(`Successfully fetched ${domains.length} disposable email domains`)

    return new Set(domains)
  } catch (error) {
    console.error("Failed to fetch disposable email domains from GitHub:", error)
    console.log("Using fallback list of disposable email domains")

    // Return fallback list if fetch fails
    return new Set(fallbackDisposableEmailDomains)
  }
}

export async function getDisposableEmailDomains(): Promise<Set<string>> {
  const now = Date.now()

  // Check if we need to refresh the cache
  if (!disposableDomainsCache || now - lastFetchTime > CACHE_DURATION) {
    disposableDomainsCache = await fetchDisposableEmailDomains()
    lastFetchTime = now
  }

  return disposableDomainsCache
}

export async function isDisposableEmail(email: string): Promise<boolean> {
  try {
    const domain = email.split("@")[1]?.toLowerCase()
    if (!domain) return false

    const disposableDomains = await getDisposableEmailDomains()
    return disposableDomains.has(domain)
  } catch (error) {
    console.error("Error checking disposable email:", error)
    // If there's an error, fall back to checking against the basic list
    const domain = email.split("@")[1]?.toLowerCase()
    return fallbackDisposableEmailDomains.includes(domain)
  }
}
