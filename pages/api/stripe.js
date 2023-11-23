import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    //console.log(req.body.cartItems);

    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: ["CA", "US"],
        },
        shipping_options: [
          { shipping_rate: "shr_1OFP9jGBB4y3pdTiwo2DsNID" },
          { shipping_rate: "shr_1OFPD2GBB4y3pdTilNKxv2rq" },
        ],
        automatic_tax: {
          enabled: true,
        },
        invoice_creation: {
          enabled: true,
        },
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/qg37mdvm/production/"
            )
            .replace("-webp", ".webp") // Replace -webp with .webp
            .replace(".png", ".webp") // Replace .png with .webp
            .replace(".jpeg", ".webp")
            .replace(".jpg", ".webp");; // Replace .jpeg with .webp;


          return {
            price_data: {
              currency: "CAD",
              product_data: {
                name: item.name,
                description: item.details,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),

        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
        automatic_tax: { enabled: true },
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
