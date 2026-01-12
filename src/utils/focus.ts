export function focusElement(elementId: string, options?: ScrollIntoViewOptions): void {
  const element = document.getElementById(elementId)
  if (!element) return

  // Primeiro faz scroll para o elemento com opções otimizadas para mobile
  const scrollOptions: ScrollIntoViewOptions = options || {
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  }
  
  element.scrollIntoView(scrollOptions)
  
  // Função para focar no elemento
  const attemptFocus = () => {
    const elementToFocus = document.getElementById(elementId)
    if (!elementToFocus) return

    // Verifica se o elemento está visível na viewport
    const rect = elementToFocus.getBoundingClientRect()
    const isVisible = 
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    // Se não estiver visível, tenta scroll novamente
    if (!isVisible) {
      elementToFocus.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    // Tenta focar no elemento
    if (
      elementToFocus instanceof HTMLInputElement ||
      elementToFocus instanceof HTMLTextAreaElement ||
      elementToFocus instanceof HTMLButtonElement ||
      elementToFocus instanceof HTMLSelectElement
    ) {
      elementToFocus.focus()
    } else {
      // Se não for um elemento focável diretamente, procura por um input/textarea/button dentro dele
      const focusableChild = elementToFocus.querySelector('input, textarea, button, select') as HTMLElement
      if (focusableChild) {
        focusableChild.focus()
      } else {
        // Como último recurso, tenta fazer focus no elemento mesmo que não seja focável
        try {
          ;(elementToFocus as HTMLElement).focus()
        } catch {
          // Ignora erros se não conseguir focar
        }
      }
    }
  }

  // Aguarda um pouco para garantir que o scroll aconteceu antes de focar
  // Isso é especialmente importante em mobile onde o scroll pode ser mais lento
  requestAnimationFrame(() => {
    setTimeout(attemptFocus, 200)
  })
}
