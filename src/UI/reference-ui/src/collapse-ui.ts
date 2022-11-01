import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@material/web/iconbutton/standard-icon-button.js'

import { toggleIconDataUri } from 'itk-viewer-icons'
import { InjectContext } from './context'

@customElement('collapse-ui')
class CollapseUi extends LitElement {
  @InjectContext() context: any

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
    this.context.service.send('TOGGLE_UI_COLLAPSED')
  }
}
