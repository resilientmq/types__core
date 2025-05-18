# @resilientmq/types__core

TypeScript definitions for the `@resilientmq/core` messaging and resilience system.

## Table of Contents

- [Installation](#installation)
- [Purpose](#purpose)
- [Examples](#examples)
    - [EventMessage](#eventmessage)
    - [EventStore Interface](#eventstore-interface)
    - [MessageQueue Interface](#messagequeue-interface)
    - [ResilientConsumerConfig](#resilientconsumerconfig)
- [Docs](#docs)
- [Issues](#issues)
    - [🐛 Bugs](#-bugs)
    - [💡 Feature Requests](#-feature-requests)
- [Contributors](#contributors)
- [LICENSE](#license)

## Installation

This is a [TypeScript](https://www.typescriptlang.org/) declaration-only package available via
the [npm registry](https://www.npmjs.com/).

Before installing, ensure you have a `package.json` set up with:

```bash
npm init -y
```

Then install this types package:

```bash
npm install @types/resilientmq__core --save-dev
```

## Purpose

This package provides strict type definitions for the `@resilientmq/core` system,
allowing strong typing for resilience-focused event processing with RabbitMQ.

## Examples

### EventMessage

```ts
import type { EventMessage, EventConsumeStatus } from '@types/resilientmq__core';

const event: EventMessage<{ userId: string }> = {
  id: 'evt-123',
  messageId: 'msg-123',
  type: 'user.created',
  payload: { userId: 'abc' },
  status: EventConsumeStatus.RECEIVED,
};
```

### EventStore Interface

```ts
import type { EventStore, EventConsumeStatus, EventMessage } from '@types/resilientmq__core';

const store: EventStore = {
  saveEvent: async (event: EventMessage) => { /* persist */ },
  updateEventStatus: async (id, status: EventConsumeStatus) => {},
  getEvent: async (id) => null,
  deleteEvent: async (id) => {},
};
```

### MessageQueue Interface

```ts
import type { MessageQueue, EventMessage } from '@types/resilientmq__core';

const queue: MessageQueue = {
  connect: async () => {},
  publish: async (queue, event, options) => {},
  consume: async (queue, onMessage) => {},
};
```

### ResilientConsumerConfig

```ts
import type { ResilientConsumerConfig } from '@types/resilientmq__core';

const config: ResilientConsumerConfig = {
    connection: 'amqp://localhost',
    consumeQueue: {
        queue: 'main.queue',
        options: { durable: true }
    },
    retryQueue: {
        queue: 'main.queue.retry',
        ttlMs: 10000,
        maxAttempts: 5,
        options: { durable: true }
    },
    deadLetterQueue: {
        queue: 'main.queue.dlq',
        options: { durable: true }
    },
    prefetch: 5,
    eventsToProcess: [
        { type: 'user.created', handler: async (payload) => console.log(payload) }
    ],
    store: { ... } // implements EventStore
};
```

## Docs

See [ResilientMQ Core Docs](https://github.com/resilientmq/types__core) for complete details.

## Issues

### 🐛 Bugs

Please file an issue if you notice missing types, incorrect structures, or inconsistencies.

[See Bugs](https://github.com/resilientmq/types__core/issues)

### 💡 Feature Requests

Have suggestions for new interfaces or type helpers? Open a feature request.

[See Feature Requests](https://github.com/resilientmq/types__core/issues)

## Contributors

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/hector-ae21">
          <img src="https://avatars.githubusercontent.com/u/87265357?v=4" width="100px;" alt="Hector L. Arrechea"/>
          <br /><sub><b>Hector L. Arrechea</b></sub>
        </a>
        <br /><a title="Code">💻</a> <a title="Documentation">📖</a> <a title="Infrastructure">🚇</a> <a title="Tests">⚠️</a>
      </td>
    </tr>
  </tbody>
</table>

## LICENSE

[MIT](LICENSE)