// Avoids error importing config UIs multiple times in tests when
// customElements.define will be called multiple times by Material-Web components

function safeDecorator(fn) {
  return function(...args) {
    try {
      return fn.apply(this, args)
    } catch (error) {
      if (
        error instanceof DOMException &&
        [
          'has already been used with this registry', // Chrome
          'has already been defined as a custom element', // Firefox
        ].some(msg => error.message.includes(msg))
      ) {
        return false
      }
      throw error
    }
  }
}

customElements.define = safeDecorator(customElements.define)
