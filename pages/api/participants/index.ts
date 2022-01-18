import {
  getParticipantsByEventId,
  addParticipant,
  deleteParticipant,
  updateParticipant,
  getParicipantByUidInEvent,
} from '../../../libs/participants';

export default async function handler(req: any, res: any) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      const { uid, eventId } = req.query;
      if (uid) {
        return getParicipantByUidInEvent(req, res);
      } else if (eventId) {
        return getParticipantsByEventId(req, res);
      } else {
        return res.json({
          message: 'Missing query params',
          success: false,
        });
      }
    }

    case 'POST': {
      return addParticipant(req, res);
    }

    case 'PUT': {
      return updateParticipant(req, res);
    }

    case 'DELETE': {
      return deleteParticipant(req, res);
    }
  }
}
