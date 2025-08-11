import { NextRequest, NextResponse } from 'next/server';

import { IPinfoWrapper } from 'node-ipinfo';

// Geolocate the browser IP address to get the city
//
// Route: /api/city?ip=<ip>
//
// Requires that the browser IP address to be passed in as a parameter
// must be a public IP address. If the IP address is not public, the function
// will provide an incorrect return value.
export async function GET(request: NextRequest): Promise<NextResponse> {
    // Get the IPINFO_TOKEN from the environment variables
    const token = process.env.IPINFO_TOKEN

    // If the IPINFO_TOKEN is not set, throw an error
    if (!token)
      throw new Error("Error geolocating browser IP address", { cause: "Missing IPINFO_TOKEN in environment" })

    // Try to geolocate the browser IP address
    try {
      // Create a new IPinfo wrapper
      const ipinfo = new IPinfoWrapper(token)

      // Use IPinfo to lookup the browser IP address and return the city
      const data = await ipinfo.lookupIp(request.nextUrl.searchParams.get('ip') || "")
      console.log(data);
      return NextResponse.json({ city: data.city })
    } catch (err) {
      // If the IPInfo geolocation fails, throw an error
      throw new Error("Error with IPInfo geolocation", { cause: err })
    }
}