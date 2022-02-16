import PushNotifications from '@pusher/push-notifications-server';

const { PUSHER_BEAM_INSTANCE_ID, PUSHER_BEAM_SECRET_KEY } = process.env;

export default async function handler(req: any, res: any) {
  try {
    if (PUSHER_BEAM_INSTANCE_ID && PUSHER_BEAM_SECRET_KEY) {
      const beamsClient = new PushNotifications({
        instanceId: PUSHER_BEAM_INSTANCE_ID,
        secretKey: PUSHER_BEAM_SECRET_KEY,
      });
      const { user_id } = req.query;

      const beamsToken = beamsClient.generateToken(user_id);
      res.send(JSON.stringify(beamsToken));
    }
  } catch (error) {
    res.status(401).send('Inconsistent request');
  }
}
