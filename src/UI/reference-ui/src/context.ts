// "Inject" XState context into components with DOM events

type AppContext = unknown

interface GetContextEvent extends Event {
  detail: { context?: AppContext }
}

export const setContext = (providerElement: Element, context: AppContext) => {
  providerElement.addEventListener('request', event => {
    const { detail } = (event as unknown) as GetContextEvent
    detail.context = context
    event.stopPropagation()
  })
}

export function InjectContext(): (target: any, name: string) => any {
  return (target: any, name: string): any => {
    const property = {
      get(): any {
        const event = new CustomEvent('request', {
          detail: {},
          bubbles: true,
          composed: true,
        }) as GetContextEvent
        // @ts-ignore
        this.dispatchEvent(event)
        return event.detail.context
      },
    }

    Object.defineProperty(target, name, property)

    return target
  }
}
