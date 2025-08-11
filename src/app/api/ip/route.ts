import { NextRequest, NextResponse } from 'next/server';

// Get IP from various headers (handles different proxy configurations)
export async function GET(request: NextRequest) {
  // Check the x-forwarded-for header for the IP address
  let forwardedIPv4 = request.headers.get('x-forwarded-for')?.split(',')[0];

  // If the IP address is in the x-forwarded-for header, it may be in the format of
  // "::192.168.0.152:ffff", so we need to extract the IP address from the header
  if (forwardedIPv4?.includes(':')) {
    const wholeForwardedIPv4 = forwardedIPv4?.split(':');
    forwardedIPv4 = wholeForwardedIPv4[0];
    for (let i = 1; i <= 3 && !forwardedIPv4?.match("[0-9]"); i++)
      forwardedIPv4 = wholeForwardedIPv4[i];
  }
  
  // Check the x-real-ip header for the IP address
  const realIp = request.headers.get('x-real-ip');

  // Check the cf-connecting-ip header for the IP address
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  // Get the IP address from the headers
  let ip = forwardedIPv4 || realIp || cfConnectingIp || "127.0.0.1";

  // If the IP address is not localhost, clean up the IP address
  if (ip != "127.0.0.1") {
    // Clean up the IP address
    ip = ip.trim();
  }
  // If the IP address is localhost, throw an error
  else 
    throw new Error("Error getting IP address", { cause: "IP address is localhost" });
  
  return NextResponse.json({ ip });
}
