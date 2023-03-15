import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { compareArrays, connectState } from 'xstate-lit/dist/select-state.js'
import '@material/web/iconbutton/standard-icon-button.js'

import {
  imageIconDataUri,
  labelsIconDataUri,
  toggleIconDataUri,
} from 'itk-viewer-icons'
import { viewerContext } from '../context'

@customElement('layer-settings')
class LayerSettings extends LitElement {
  @property()
  layer: { type: string } = { type: 'image' }

  @property()
  name: string = ''

  otherImages = connectState(
    viewerContext,
    this,
    (state: any) => {
      return new Map(
        [...state.context.layers.actorContext.entries()].filter(
          ([key]) =>
            key !== this.name &&
            state.context.images.actorContext.get(this.name)?.labelImage !== key
        )
      )
    },
    (a, b) => compareArrays([...a.keys()], [...b.keys()])
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
        this.otherImages.value.size > 0
      )
        return { icon: toggleIconDataUri, alt: 'image settings' }
      return { icon: imageIconDataUri, alt: 'image' }
    }
    if (this.layer.type === 'labelImage')
      return { icon: labelsIconDataUri, alt: 'labels' }
    throw new Error(`Unsupported layer type: ${this.layer.type}`)
  }

  render() {
    const { icon, alt } = this.getIcon()
    return html`
      <div>
        <img src="${icon}" alt="${alt}" class="icon" />
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
