import { z } from "zod";

export const checkoutRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().min(1).max(30),
    address: z.string().trim().min(1).max(200),
    city: z.string().trim().min(1).max(100),
    postalCode: z.string().trim().min(1).max(20),
    paymentMethod: z.literal("cod"),
    items: z
      .array(
        z
          .object({
            productId: z.string().trim().min(1).max(64),
            quantity: z.number().int().min(1).max(99),
          })
          .strict(),
      )
      .min(1)
      .max(50)
      .superRefine((items, context) => {
        const productIds = new Set<string>();

        items.forEach((item, index) => {
          if (productIds.has(item.productId)) {
            context.addIssue({
              code: "custom",
              path: [index, "productId"],
              message: "Each product can only appear once.",
            });
          }

          productIds.add(item.productId);
        });
      }),
  })
  .strict();

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;