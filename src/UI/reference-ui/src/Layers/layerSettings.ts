import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ref, createRef, Ref } from 'lit/directives/ref.js'
import { map } from 'lit/directives/map.js'
import { ContextConsumer } from '@lit-labs/context'
import '@material/web/menu/menu.js'
import { MdMenu } from '@material/web/menu/menu.js'
import '@material/web/menu/menu-item.js'
import '@material/web/menu/sub-menu-item.js'
import { makeHtml } from '../utils'
import style from '../ItkVtkViewer.module.css'
import { viewerContext } from '../context'

@customElement('layer-settings')
class LayerSettings extends LitElement {
  @property()
  name: string = ''

  @property()
  otherImages: Array<string> = []

  @property()
  enable: boolean = true

  menuRef: Ref<MdMenu> = createRef()
  anchorRef: Ref<HTMLElement> = createRef()
  // avoid overflow: hidden on parents clipping menu
  floatingAnchor = makeHtml(`<div class="${style.floater}"></div>`)

  stateService = new ContextConsumer(this, viewerContext, undefined, true)

  connectedCallback() {
    super.connectedCallback()
    document.body.appendChild(this.floatingAnchor)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.body.removeChild(this.floatingAnchor)
  }

  showMenu() {
    if (!this.enable) return
    const { top = 0, left = 0 } =
      this.anchorRef.value?.getBoundingClientRect() ?? {}
    this.floatingAnchor.style.top = `${top}px`
    this.floatingAnchor.style.left = `${left}px`
    if (this.menuRef.value) {
      this.menuRef.value.anchor = this.floatingAnchor
      this.floatingAnchor.appendChild(this.menuRef.value)
      this.menuRef.value.show()
    }
  }

  compareWith(name: string, method: string) {
    this.stateService.value?.service.send({
      type: 'COMPARE_IMAGES',
      data: {
        name: this.name,
        fixedImageName: name,
        options: { method },
      },
    })
  }

  stopComparing() {
    this.stateService.value?.service.send({
      type: 'COMPARE_IMAGES',
      data: {
        name: this.name,
        options: { method: 'disabled' },
      },
    })
  }

  render() {
    return html`
      <div
        @click=${() => {
          this.showMenu()
          this.render()
        }}
        class=${this.enable ? 'clickable' : ''}
      >
        <slot></slot>
        <div ${ref(this.anchorRef)} style="position:relative; z-index: 4000;">
          <md-menu ${ref(this.menuRef)}>
            ${map(
              this.otherImages,
              name =>
                html`
                  <md-menu-item
                    headline="Checkerboard compare with ${name}"
                    @click=${() => this.compareWith(name, 'checkerboard')}
                  ></md-menu-item>
                  <md-menu-item
                    headline="Green-Magenta compare with ${name}"
                    @click=${() => this.compareWith(name, 'green-magenta')}
                  ></md-menu-item>
                  <md-menu-item
                    headline="Cyan-Red compare with ${name}"
                    @click=${() => this.compareWith(name, 'cyan-red')}
                  ></md-menu-item>
                  <md-menu-item
                    headline="Cyan-Magenta compare with ${name}"
                    @click=${() => this.compareWith(name, 'cyan-magenta')}
                  ></md-menu-item>
                  <md-menu-item
                    headline="Blend compare with ${name}"
                    @click=${() => this.compareWith(name, 'blend')}
                  ></md-menu-item>
                `
            )}
            <md-menu-item
              headline="Stop comparing"
              @click=${this.stopComparing}
            ></md-menu-item>
          </md-menu>
        </div>
      </div>
    `
  }

  static styles = css`
    .clickable {
      cursor: pointer;
    }
  `
}
