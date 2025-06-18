import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const SESSIONS_DIR = path.resolve(process.cwd(), 'sessions');

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }
    const file = path.join(SESSIONS_DIR, `${sessionId}.json`);
    await fs.unlink(file).catch(() => {});
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reset session' }, { status: 500 });
  }
}