import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getOrderForConfirmation, toCheckoutOrder } from "@/lib/orders";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const { orderId } = await params;
  const confirmationToken = (await cookies()).get("atelier-order-access")?.value;

  if (!confirmationToken) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  try {
    const order = await getOrderForConfirmation(orderId, confirmationToken);

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json(toCheckoutOrder(order), {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "We could not load this order. Please try again." },
      { status: 500 },
    );
  }
}