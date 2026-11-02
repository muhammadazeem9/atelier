import { createHash, randomBytes } from "node:crypto";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { calculateOrderAmounts } from "@/lib/order-pricing";
import type { CheckoutOrder } from "@/types/order";
import type { CheckoutRequest } from "@/lib/checkout-validation";

export class InvalidOrderItemsError extends Error {}

type OrderWithItems = Prisma.OrderGetPayload<{
  include: { items: true };
}>;

export function hashConfirmationToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function toCheckoutOrder(order: OrderWithItems): CheckoutOrder {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    customer: {
      name: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
      address: order.shippingAddress,
      city: order.city,
      postalCode: order.postalCode,
    },
    paymentMethod: "cod",
    items: order.items.map((item) => ({
      id: item.id,
      name: item.productName,
      price: item.unitPrice.toNumber(),
      quantity: item.quantity,
      image: item.productImage,
    })),
    subtotal: order.subtotal.toNumber(),
    shipping: order.shipping.toNumber(),
    total: order.total.toNumber(),
    createdAt: order.createdAt.toISOString(),
  };
}

export async function createOrder(input: CheckoutRequest) {
  const confirmationToken = randomBytes(32).toString("base64url");
  const confirmationTokenHash = hashConfirmationToken(confirmationToken);
  const orderNumber = `ATL-${Date.now()}-${randomBytes(3).toString("hex").toUpperCase()}`;

  const order = await prisma.$transaction(async (transaction) => {
    const products = await transaction.product.findMany({
      where: { id: { in: input.items.map((item) => item.productId) } },
    });
    const productsById = new Map(products.map((product) => [product.id, product]));

    if (products.length !== input.items.length) {
      throw new InvalidOrderItemsError(
        "One or more products are no longer available. Review your bag and try again.",
      );
    }

    const orderLines = input.items.map((item) => {
      const product = productsById.get(item.productId);

      if (!product || !product.inStock) {
        throw new InvalidOrderItemsError(
          "One or more products are no longer available. Review your bag and try again.",
        );
      }

      return { product, quantity: item.quantity, unitPrice: product.price };
    });
    const pricing = calculateOrderAmounts(orderLines);

    return transaction.order.create({
      data: {
        orderNumber,
        confirmationTokenHash,
        customerName: input.name,
        customerEmail: input.email,
        customerPhone: input.phone,
        shippingAddress: input.address,
        city: input.city,
        postalCode: input.postalCode,
        paymentMethod: "COD",
        status: "PLACED",
        subtotal: pricing.subtotal,
        shipping: pricing.shipping,
        total: pricing.total,
        items: {
          create: pricing.lines.map(({ product, quantity, unitPrice, lineTotal }) => {
            return {
              productId: product.id,
              productName: product.name,
              productImage: product.image,
              unitPrice,
              quantity,
              lineTotal,
            };
          }),
        },
      },
      include: { items: true },
    });
  });

  return { order, confirmationToken };
}

export async function getOrderForConfirmation(
  orderId: string,
  confirmationToken: string,
) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      confirmationTokenHash: hashConfirmationToken(confirmationToken),
    },
    include: { items: true },
  });
}