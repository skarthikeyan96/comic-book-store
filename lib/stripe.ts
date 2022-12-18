import { loadStripe } from '@stripe/stripe-js';




const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
export const initateCheckout = async (cart: any) => {

    // Create a Checkout Session.
    const {sessionId} = await fetch(
      '/api/checkout',
      { 
        method: 'POST',
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify(cart)
      },
    ).then(res => res.json());
  
    // Redirect to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
  };