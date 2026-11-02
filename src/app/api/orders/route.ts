import { NextResponse } from "next/server";
import { checkoutRequestSchema } from "@/lib/checkout-validation";
import { createOrder, InvalidOrderItemsError } from "@/lib/orders";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
  }

  const parsed = checkoutRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check your delivery details and bag contents.",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  try {
    const { order, confirmationToken } = await createOrder(parsed.data);
    const response = NextResponse.json(
      { orderId: order.id, orderNumber: order.orderNumber },
      { status: 201 },
    );
    response.headers.set("Cache-Control", "private, no-store");

    response.cookies.set("atelier-order-access", confirmationToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: `/api/orders/${order.id}`,
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    if (error instanceof InvalidOrderItemsError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    console.error("Order creation failed.");
    return NextResponse.json(
      { error: "We could not place your order. Please try again." },
      { status: 500 },
    );
  }
}