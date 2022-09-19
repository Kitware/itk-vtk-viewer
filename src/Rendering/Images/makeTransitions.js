export const makeTransitions = (events, transition) =>
  events.reduce(
    (onEvents, e) => ({
      ...onEvents,
      [e]: transition,
    }),
    {}
  )
