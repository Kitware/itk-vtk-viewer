import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@material/web/iconbutton/standard-icon-button.js'
import { toggleIconDataUri } from '@itk-viewer/icons'
import { connectState } from 'xstate-lit/dist/select-state'

import { viewerContext } from './context'

@customElement('collapse-ui')
class CollapseUi extends LitElement {
  service = connectState(
    viewerContext,
    this,
    (state: any) => state.context.service
  )

  static styles = css`
    .icon {
      width: 100%;
    }
  `

  render() {
    return html`
      <md-standard-icon-button @click=${this.toggleUi}>
        <img src="${toggleIconDataUri}" alt="toggle" class="icon" />
      </md-standard-icon-button>
    `
  }

  toggleUi() {
    this.service.value.send('TOGGLE_UI_COLLAPSED')
  }
}
