import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ version: '2.0' });
}
