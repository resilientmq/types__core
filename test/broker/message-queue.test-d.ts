import {MessageQueue} from "../../src/broker/message-queue";
import {EventMessage} from "../../src/resilience/event-message";


const mockQueue: MessageQueue = {
  connect: async () => {},
  publish: async (queue: string, event: EventMessage) => {},
  consume: async (queue: string, onMessage: (event: EventMessage) => Promise<void>) => {}
};