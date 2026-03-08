import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'VERCEL_TOKEN not configured' }, { status: 500 });
  }

  try {
    const res = await fetch('https://api.vercel.com/v6/deployments?limit=50', {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 }, // cache 5 min
    });
    const data = await res.json();
    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch Vercel data' }, { status: 500 });
  }
}
