const express = require("express");
const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51HWM5MKxYX2Tm5prn65nqNOgK1n8yzUKtOoRPvPOvPXBlEkleU65AcqdCD5T3oWO8tmGixgLpXoVn8yLELmcOQ3g00TpiTiFUC"
);
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  try {
    const { amount, id } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Gaming keyboard",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
});

app.listen(3001, () => {
  console.log("Server on port", 3001);
});
