import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  const userId = session.user.id;

  try {
    const totalIntegrations = await prisma.integration.count({
      where: { userId },
    });

    const activeIntegrations = await prisma.integration.count({
      where: { userId, status: 'connected' },
    });

    const userStats = await prisma.userStats.findUnique({
      where: { userId },
    });

    return NextResponse.json({
      integrations: {
        active: activeIntegrations,
        total: totalIntegrations,
      },
      messagesAutomatises: userStats?.messagesAutomatises ?? 0,
      campagnesLancees: userStats?.campagnesLancees ?? 0,
      tauxReponse: userStats?.tauxReponse ?? 0,
    });
  } catch (error) {
    console.error('[API_STATS_ERROR]', error);
    return new NextResponse('Erreur interne', { status: 500 });
  }
}
