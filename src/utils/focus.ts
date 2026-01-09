export function focusElement(elementId: string, options?: ScrollIntoViewOptions): void {
  requestAnimationFrame(() => {
    const element = document.getElementById(elementId)
    if (element) {
      if (options) {
        element.scrollIntoView(options)
      }
      element.focus()
    }
  })
}
