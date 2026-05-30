import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '../../lib/supabase';

function cleanText(value: unknown, max = 160) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, max) : '';
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = cleanText(body?.email, 180).toLowerCase();
    const source = cleanText(body?.source, 80) || 'homepage';

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    const { error } = await getSupabaseAdminClient().from('leads').upsert(
      { email, source },
      { onConflict: 'email', ignoreDuplicates: true }
    );

    if (error) {
      return NextResponse.json({ error: 'Something went wrong. Try again in a moment.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Try again in a moment.' }, { status: 500 });
  }
}
