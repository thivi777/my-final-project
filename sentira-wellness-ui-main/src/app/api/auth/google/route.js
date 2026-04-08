import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

// GET /api/auth/google - Redirects to Google OAuth
export async function GET(request) {
  const origin = new URL(request.url).origin;
  const redirect_uri = process.env.GOOGLE_CALLBACK_URL || `${origin}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri,
    response_type: 'code',
    scope: 'profile email',
    access_type: 'offline',
  });
  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}
