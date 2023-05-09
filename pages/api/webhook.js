import { initMongoose } from "../../lib/mongoose";
import Order from "../../models/Order";
import { buffer } from 'micro';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await initMongoose();
  const signingSecret = 'whsec_2b6fb3856c17e8072eaeddd36e52ac7976a879d606a32778ebd679ce6a9e860e';
  const payload = await buffer(req);
  const signature = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(payload, signature, signingSecret);

  if (event?.type === 'checkout.session.completed') {
    console.log(event);
    const metadata = event.data?.object?.metadata;
    const paymentStatus = event.data?.object?.payment_status;
    if (metadata?.orderId && paymentStatus === 'paid') {
      await Order.findByIdAndUpdate(metadata.orderId, { paid: 1 });
    }
  }

  res.json('ok');
}

export const config = {
  api: {
    bodyParser: false,
  }
}