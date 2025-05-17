# @types/resilientmq__core

TypeScript definitions for the `@resilientmq/core` messaging and resilience system.

## Table of Contents

<!-- DON'T EDIT THIS SECTION -->

- [@types/resilientmq__core](#typesresilientmq__core)
    - [Table of Contents](#table-of-contents)
    - [Installation](#installation)
    - [Purpose](#purpose)
    - [Examples](#examples)
        - [EventMessage](#eventmessage)
        - [EventStore Interface](#eventstore-interface)
        - [MessageQueue Interface](#messagequeue-interface)
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

This package provides type definitions for the [`@resilientmq/core`](https://www.npmjs.com/package/@resilientmq/core) library.

It enables strict type-checking, IDE autocompletion, and developer tooling support for projects using the ResilientMQ event processing system.

## Examples

### EventMessage

```ts
import type { EventMessage, EventStatus } from '@types/resilientmq__core';

const event: EventMessage<{ userId: string }> = {
  id: 'evt-123',
  messageId: 'msg-123',
  type: 'user.created',
  payload: { userId: 'abc' },
  status: EventStatus.RECEIVED,
};
```

### EventStore Interface

```ts
import type { EventStore, EventStatus, EventMessage } from '@types/resilientmq__core';

const store: EventStore = {
  saveEvent: async (event: EventMessage) => {},
  updateEventStatus: async (id, status: EventStatus) => {},
  getEvent: async (id) => null,
  deleteEvent: async (id) => {},
};
```

### MessageQueue Interface

```ts
import type { MessageQueue, EventMessage } from '@types/resilientmq__core';

const queue: MessageQueue = {
  connect: async () => {},
  publish: async (queue, event) => {},
  consume: async (queue, onMessage) => {},
};
```

## Docs

Check out the [ResilientMQ Core Docs](https://github.com/resilientmq/types__core) for more on the event system this types package supports.

## Issues

### 🐛 Bugs

Please file an issue if you notice missing types, incorrect structures, or inconsistencies.

[See Bugs](https://github.com/resilientmq/types__core/issues)

### 💡 Feature Requests

Have suggestions for new interfaces or type helpers? Open a feature request.

[See Feature Requests](https://github.com/resilientmq/types__core/issues)

## Contributors

<!-- Do not remove or modify this section -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hector-ae21"><img src="https://avatars.githubusercontent.com/u/87265357?v=4" width="100px;" alt="Hector L. Arrechea"/><br /><sub><b>Hector L. Arrechea</b></sub></a><br /><a title="Code">💻</a> <a title="Documentation">📖</a> <a title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

## LICENSE

[MIT](LICENSE)
