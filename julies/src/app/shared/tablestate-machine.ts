import { createMachine } from 'xstate';

export enum States {
  free = 'free',
  ordered = 'ordered',
  prepared = 'prepared',
  delivered = 'delivered',
  paid = 'paid',
  dirty = 'dirty',
}
export const tableMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'table',
    initial: 'free',
    states: {
      free: {
        on: {
          ordered: [
            {
              target: 'ordered',
              actions: ['log'],
            },
          ],
        },
      },
      ordered: {
        on: {
          prepared: [
            {
              target: 'prepared',
              actions: ['log'],
            },
          ],
          dirty: [
            {
              target: 'dirty',
              actions: ['log'],
            },
          ],
        },
      },
      prepared: {
        on: {
          delivered: [
            {
              target: 'delivered',
              actions: ['log'],
            },
          ],
          ordered: [
            {
              target: 'ordered',
              actions: ['log'],
            },
          ],
          dirty: [
            {
              target: 'dirty',
              actions: ['log'],
            },
          ],
        },
      },
      delivered: {
        on: {
          ordered: [
            {
              target: 'ordered',
              actions: ['log'],
            },
          ],
          prepared: [
            {
              target: 'prepared',
              actions: ['log'],
            },
          ],
          paid: [
            {
              target: 'paid',
              actions: ['log'],
            },
          ],
          dirty: [
            {
              target: 'dirty',
              actions: ['log'],
            },
          ],
        },
      },
      paid: {
        on: {
          dirty: [
            {
              target: 'dirty',
              actions: ['log'],
            },
          ],
          ordered: [
            {
              target: 'ordered',
              actions: ['log'],
            },
          ],
        },
      },
      dirty: {
        on: {
          free: [
            {
              target: 'free',
              actions: ['log'],
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      // action implementations
      log: (context, event) => {
        console.log(`Transition to ${event.type}`);
      },
    },
  }
);
