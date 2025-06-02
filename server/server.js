require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const app = express();

app.use(cors({ origin: process.env.FRONTEND_DOMAIN }));
app.use(express.json());

app.post("/api/create-checkout-session", async (req, res) => {
  const { amount, currency, customer_email, customer_name, product_name } =
    req.body;

  // Input validation
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  if (!currency || !["usd", "eur", "gbp"].includes(currency)) {
    return res.status(400).json({ error: "Unsupported currency" });
  }
  if (!customer_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer_email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (!product_name) {
    return res.status(400).json({ error: "Product name is required" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: product_name,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email,
      success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
