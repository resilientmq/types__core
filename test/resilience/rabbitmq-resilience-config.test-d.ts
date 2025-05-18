import {ResilientConsumerConfig} from "../../src/resilience/rabbitmq-resilience-config";

const config: ResilientConsumerConfig = {
  connection: 'amqp://localhost',
  consumeQueue: {
    queue: 'main-queue',
    options: {},
    exchange: {
      name: 'main-exchange',
      type: 'direct',
      options: {}
    }
  },
  eventsToProcess: [],
  store: {
    saveEvent: async () => {},
    updateEventStatus: async () => {},
    getEvent: async () => null,
    deleteEvent: async () => {}
  }
};