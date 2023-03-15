import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ContextProvider } from '@lit-labs/context'
import { appContext, viewerContext } from './context'

@customElement('service-context')
export class ServiceContext extends LitElement {
  // @ts-ignore
  private provider = new ContextProvider(this, viewerContext, {
    service: appContext.service,
  })
  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'service-context': ServiceContext
  }
}
