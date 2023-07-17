import Stripe from "stripe";
import config from "../utils/config/config";
import { Request, Response } from "express";

export default class PaymentController {
   private stripe: Stripe;
   constructor() {
      this.stripe = new Stripe(config.stripeKey, {
         apiVersion: "2022-11-15",
      });
   }

   public createIntent = async (req: Request, res: Response) => {
      const bodyPayment: any[] = req.body.orden;
      const listeItems = bodyPayment.map((e: any) => {
         return {
            price_data: {
               currency: "usd",
               unit_amount_decimal: e.price,
               product_data: {
                  name: e.name,
               },
            },
            quantity: e.quantity,
         };
      });

      try {
         const sessionParams: Stripe.Checkout.SessionCreateParams = {
            line_items: listeItems,

            customer_email: req.body.email,
            client_reference_id: req.body.id,
            customer_creation: "always",

            payment_method_types: ["card"],
            mode: "payment",
            success_url: `http://localhost:3000/api/success`,
            cancel_url: "http://localhost:3000/api/cancel",
         };

         const paymentIntent = await this.stripe.checkout.sessions.create(
            sessionParams
         );

         return res.status(200).json(paymentIntent);
      } catch (error) {
         console.error(error);
         return res
            .status(500)
            .json({ error: "Error al crear la sesión de pago" });
      }
   };
}
