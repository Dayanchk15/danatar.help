interface ElementWithResize extends HTMLElement {
  onResize?: () => void
  onWidthResize?: () => void
}

const resizeElements: ElementWithResize[] = []

window.addEventListener('resize', onResize)
let width = -1
let timeoutID: number;

function onResize() {
  clearTimeout(timeoutID)

  timeoutID = window.setTimeout(() => {
    const widthChanged = width !== window.innerWidth

    for (let i = resizeElements.length - 1; i >= 0; i--) {
      const el = resizeElements[i];
      if (!el.isConnected) {
        resizeElements.splice(i, 1);
        continue;
      }
      el.onResize && el.onResize.call(el);
        if (widthChanged && el.onWidthResize) {
        el.onWidthResize.call(el);
      }
    }

    width = window.innerWidth
  }, 15)

}

export function addResizeObserver(el: ElementWithResize) {
  resizeElements.push(el)
}

interface ElementWithScroll extends HTMLElement {
  onScroll: (y: number) => void
}

const scrollElements: ElementWithScroll[] = []

window.addEventListener('scroll', onScroll, { passive: true })

function onScroll() {
  const y = window.scrollY

  for (let i = scrollElements.length - 1; i >= 0; i--) {
    const el = scrollElements[i];
    if (!el.isConnected) {
      scrollElements.splice(i, 1);
      continue;
    }
    el.onScroll.call(el, y);
  }
}

export function addScrollObserver(el: ElementWithScroll) {
  scrollElements.push(el)
}

export interface VisibilityChangeElement extends HTMLElement {
  onVisibilityChange: (entries: IntersectionObserverEntry[]) => void
}

function onVisibilityChange(entries: IntersectionObserverEntry[]) {
  entries.forEach((ent) => {
    const target = ent.target as VisibilityChangeElement

    if (target.onVisibilityChange) {
      target.onVisibilityChange.call(target, [ent])
    }
  })
}

const observer = new IntersectionObserver(onVisibilityChange, {
  root: null,
  rootMargin: '10px 0px',
  threshold: 0,
})

export function addIntersectingObserver(el: VisibilityChangeElement) {
  observer.unobserve(el)
  observer.observe(el)
}

