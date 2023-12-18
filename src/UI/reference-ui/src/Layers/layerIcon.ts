import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { compareArrays, connectState } from 'xstate-lit/dist/select-state.js'
import {
  imageIconDataUri,
  labelsIconDataUri,
  toggleIconDataUri,
} from '@itk-viewer/icons'
import { viewerContext } from '../context'

import './layerSettings.js'

@customElement('layer-icon')
class LayerIcon extends LitElement {
  @property()
  layer: { type: string } = { type: 'image' }

  @property()
  name: string = ''

  @state()
  private settingsOpen = true

  otherImages = connectState(
    viewerContext,
    this,
    (state: any) =>
      [...state.context.layers.actorContext.keys()].filter(
        key =>
          key !== this.name &&
          state.context.images.actorContext.get(this.name)?.labelImage?.name !==
            key
      ),
    compareArrays
  )

  selectedName = connectState(
    viewerContext,
    this,
    (state: any) => state.context.images.selectedName
  )

  getIcon() {
    if (this.layer.type === 'image') {
      if (
        this.name === this.selectedName.value &&
        this.otherImages.value &&
        this.otherImages.value.length > 0
      )
        return { icon: toggleIconDataUri, alt: 'settings' }
      return { icon: imageIconDataUri, alt: 'image' }
    }
    if (this.layer.type === 'labelImage')
      return { icon: labelsIconDataUri, alt: 'labels' }
    throw new Error(`Unsupported layer type: ${this.layer.type}`)
  }

  render() {
    const { icon, alt } = this.getIcon()
    const settingsPossible = alt === 'settings'
    return html`
      <div>
        <layer-settings
          .name=${this.name}
          .otherImages=${this.otherImages.value}
          .enable=${settingsPossible}
        >
          <img src="${icon}" alt="${alt}" class="icon" />
        </layer-settings>
      </div>
    `
  }

  static styles = css`
    .icon {
      height: 1.2em;
      width: 1.2em;
      padding-top: 2px;
      padding-bottom: 2px;
      padding-left: 8px;
      padding-right: 6px;
    }
  `
}
