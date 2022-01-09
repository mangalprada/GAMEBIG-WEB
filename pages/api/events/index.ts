import {
  getEvents,
  addEvent,
  deleteEvent,
  updateEvent,
  getEventById,
  getEventsByPageId,
} from '../../../libs/events';

export default async function handler(req: any, res: any) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      const { id, pageId } = req.query;
      if (id) {
        return getEventById(req, res);
      } else if (pageId) {
        return getEventsByPageId(req, res);
      } else {
        return getEvents(req, res);
      }
    }

    case 'POST': {
      return addEvent(req, res);
    }

    case 'PUT': {
      return updateEvent(req, res);
    }

    case 'DELETE': {
      return deleteEvent(req, res);
    }
  }
}
