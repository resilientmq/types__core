import {EventMessage} from "../../src/resilience/event-message";

const validEvent: EventMessage<{ userId: string }> = {
  id: '1',
  messageId: 'msg-1',
  type: 'user.created',
  payload: { userId: 'abc' },
  status: 'RECEIVED'
};