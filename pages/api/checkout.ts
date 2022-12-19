import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'


const stripe:any = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: "2022-11-15",
});


const ProtectedRoute: NextApiHandler = async (req, res) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res })
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return res.status(401).json({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
    })

  // Run queries with RLS on the server
    const cartItems = req.body.map((item: any) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: (Number.parseInt(item.price) * 70) * 100
      },
      quantity: item.quantity,
    };
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: cartItems,
    mode: "payment",
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}`,
  });

    res.status(200).json({ sessionId: stripeSession.id });

}

export default ProtectedRoute