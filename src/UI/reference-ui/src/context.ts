// "Inject" XState context into components with DOM events
import { createContext } from '@lit-labs/context'
export type ViewerContext = { service: any }
export const viewerContext = createContext<ViewerContext>('viewer-context')

type AppContext = any

export let appContext: AppContext

export const setContext = (context: AppContext) => {
  appContext = context
}
