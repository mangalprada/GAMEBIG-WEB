import { v4 as uuidv4 } from 'uuid';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: 'rzp_test_2TYHpxVnjqaIze',
  key_secret: 'qt9b1DsJGZIuGBoDEPdsXkjs',
});

export default async function handler(req: any, res: any) {
  const payment_capture = 1;
  const amount = 499;
  const currency = 'INR';

  const options = {
    amount: amount * 100,
    currency,
    receipt: uuidv4(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
}
