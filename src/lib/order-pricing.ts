import { Prisma } from "@/generated/prisma/client";

const FREE_SHIPPING_THRESHOLD = new Prisma.Decimal(100);
const STANDARD_SHIPPING = new Prisma.Decimal(5);

type PriceLine<T> = T & {
  unitPrice: Prisma.Decimal;
  quantity: number;
};

export function calculateOrderAmounts<T>(lines: PriceLine<T>[]) {
  const pricedLines = lines.map((line) => ({
    ...line,
    lineTotal: line.unitPrice.mul(line.quantity),
  }));
  const subtotal = pricedLines.reduce(
    (sum, line) => sum.plus(line.lineTotal),
    new Prisma.Decimal(0),
  );
  const shipping = subtotal.gte(FREE_SHIPPING_THRESHOLD)
    ? new Prisma.Decimal(0)
    : STANDARD_SHIPPING;

  return {
    lines: pricedLines,
    subtotal,
    shipping,
    total: subtotal.plus(shipping),
  };
}