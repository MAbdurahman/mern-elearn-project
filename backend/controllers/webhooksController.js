import { Webhook } from "svix";
import User from '../models/userModel.js';

/**
 * clerkWebhooks - manages clerk user with database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const clerkWebhooks = async (req, res) => {
   try {
      const clerkWebhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

      await clerkWebhook.verify(JSON.stringify(req.body), {
         "svix-id": req.headers["svix-id"],
         "svix-timestamp": req.headers["svix-timestamp"],
         "svix-signature": req.headers["svix-signature"]
      });

      const { data, type } = req.body

      switch (type) {
         case 'user.created': {

            const userData = {
               _id: data.id,
               email: data.email_addresses[0].email_address,
               name: data.first_name + " " + data.last_name,
               imageURL: data.image_url,
               resume: ''
            }
            await User.create(userData);
            res.json({});
            break;
         }

         case 'user.updated': {
            const userData = {
               email: data.email_addresses[0].email_address,
               name: data.first_name + " " + data.last_name,
               imageURL: data.image_url,
            }
            await User.findByIdAndUpdate(data.id, userData);
            res.json({});
            break;
         }

         case 'user.deleted': {
            await User.findByIdAndDelete(data.id);
            res.json({});
            break;
         }
         default:
            break;
      }

   } catch(err) {
      res.json({ success: false, message: err.message });
   }
}


export const stripeWebhooks = async (req, res) => {

   res.json({success: true, message: 'Stripe webhooks'});
}