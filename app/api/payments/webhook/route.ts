import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { workflows } from '@/lib/workflows';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2025-01-27.acacia' as any,
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, courseId } = session.metadata!;

      // Create enrollment
      await prisma.enrollment.create({
        data: {
          userId,
          courseId: courseId!,
        }
      });

      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          userId,
          courseId: courseId!,
          amount: session.amount_total! / 100,
          status: 'COMPLETED',
          stripeSessionId: session.id,
        }
      });

      // Trigger workflow
      await workflows.handlePaymentSuccess(payment);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
