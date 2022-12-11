import { assign, createMachine } from 'xstate';

export enum States {
  free = 'free',
  ordered = 'ordered',
  prepared = 'prepared',
  delivered = 'delivered',
  paid = 'paid',
  dirty = 'dirty',
}

// Action to assign the table id to context
const assignId = assign({
  id: (context, event: any) => event?.id,
});

export const tableMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'table',
    initial: States.free,
    states: {
      free: {
        on: {
          ordered: [
            {
              target: States.ordered,
              actions: ['log'],
            },
          ],
        },
      },
      ordered: {
        on: {
          prepared: [
            {
              target: States.prepared,
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
          ordered: [
            {
              target: States.ordered,
              actions: ['log'],
            },
          ],
          delivered: [
            {
              target: States.delivered,
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
              target: States.ordered,
              actions: ['log'],
            },
          ],
          paid: [
            {
              target: States.paid,
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
          ordered: [
            {
              target: States.ordered,
              actions: ['log'],
            },
          ],
          dirty: [
            {
              target: States.dirty,
              actions: ['log'],
            },
          ],
        },
      },
      dirty: {
        on: {
          free: [
            {
              target: States.free,
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
