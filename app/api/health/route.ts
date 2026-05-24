import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const START_TIME = Date.now();

export async function GET(_req: NextRequest) {
  const checks: Record<string, string> = {};
  let healthy = true;

  // Database check
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = 'ok';
  } catch (err) {
    checks.database = 'error';
    healthy = false;
  }

  // Memory check
  const mem = process.memoryUsage();
  const heapUsedMb = Math.round(mem.heapUsed / 1024 / 1024);
  checks.memory = `${heapUsedMb}MB`;

  const uptimeSeconds = Math.floor((Date.now() - START_TIME) / 1000);

  return NextResponse.json(
    {
      status: healthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime_seconds: uptimeSeconds,
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      checks,
    },
    {
      status: healthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
    }
  );
}
