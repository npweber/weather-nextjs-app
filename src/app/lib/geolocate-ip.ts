import { IPinfoWrapper } from 'node-ipinfo';

// Geolocate the browser IP address to get the city
export async function getCityFromBrowserIP(browserIp: string): Promise<string> {
  // Get the IPINFO_TOKEN from the environment variables
  const token = process.env.IPINFO_TOKEN
  if (!token)
    throw new Error('Missing IPINFO_TOKEN in environment')

  // Create a new IPinfo wrapper
  const ipinfo = new IPinfoWrapper(token)

  // Use IPinfo to lookup the browser IP address and return the city
  try {
    const data = await ipinfo.lookupIp(browserIp)
    return data.city
  } catch (err) {
    console.error("Error geolocating browser IP address", { cause: err })
    return "City"
  }
}