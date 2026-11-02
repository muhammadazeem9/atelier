import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Prisma } from "@/generated/prisma/client";
import { checkoutRequestSchema } from "@/lib/checkout-validation";
import { calculateOrderAmounts } from "@/lib/order-pricing";

const validRequest = {
  name: "Alex Atelier",
  email: "alex@example.com",
  phone: "555-0100",
  address: "10 Main Street",
  city: "Portland",
  postalCode: "97201",
  paymentMethod: "cod",
  items: [{ productId: "prod_1", quantity: 2 }],
};

describe("checkout request validation", () => {
  it("accepts customer details and product IDs with quantities", () => {
    assert.equal(checkoutRequestSchema.safeParse(validRequest).success, true);
  });

  it("rejects empty carts and client-supplied prices", () => {
    assert.equal(
      checkoutRequestSchema.safeParse({ ...validRequest, items: [] }).success,
      false,
    );
    assert.equal(
      checkoutRequestSchema.safeParse({
        ...validRequest,
        items: [{ productId: "prod_1", quantity: 2, price: 0.01 }],
      }).success,
      false,
    );
  });

  it("rejects duplicate products and online payment", () => {
    assert.equal(
      checkoutRequestSchema.safeParse({
        ...validRequest,
        items: [
          { productId: "prod_1", quantity: 1 },
          { productId: "prod_1", quantity: 1 },
        ],
      }).success,
      false,
    );
    assert.equal(
      checkoutRequestSchema.safeParse({
        ...validRequest,
        paymentMethod: "online",
      }).success,
      false,
    );
  });
});

describe("server order totals", () => {
  it("charges standard shipping below the free-shipping threshold", () => {
    const result = calculateOrderAmounts([
      { unitPrice: new Prisma.Decimal("20.00"), quantity: 2 },
    ]);

    assert.equal(result.subtotal.toFixed(2), "40.00");
    assert.equal(result.shipping.toFixed(2), "5.00");
    assert.equal(result.total.toFixed(2), "45.00");
    assert.equal(result.lines[0].lineTotal.toFixed(2), "40.00");
  });

  it("waives shipping at the threshold", () => {
    const result = calculateOrderAmounts([
      { unitPrice: new Prisma.Decimal("50.00"), quantity: 2 },
    ]);

    assert.equal(result.subtotal.toFixed(2), "100.00");
    assert.equal(result.shipping.toFixed(2), "0.00");
    assert.equal(result.total.toFixed(2), "100.00");
  });
});