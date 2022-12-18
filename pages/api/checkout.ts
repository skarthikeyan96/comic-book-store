import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: "2020-08-27",
});

export default async (request: NextApiRequest, res: NextApiResponse) => {
  const cartItems = request.body.map((item: any) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: cartItems,
    mode: "payment",
    success_url: `${request.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${request.headers.origin}`,
  });

  res.status(200).json({ sessionId: session.id });
};