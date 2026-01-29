import gsap from 'gsap'
import { addIntersectingObserver } from './observers';
import type { VisibilityChangeElement } from './observers';

type FN = (t: number) => void
interface TickerElement extends HTMLElement {
  onVisibilityChange?: (entries: IntersectionObserverEntry[]) => void
  tick: (t: number) => void
}

const visibleElements: TickerElement[] = []
const fns: FN[] = []

export function addGlobalTicker(fn: FN) {
  fns.push(fn)
}

export function addIntersectingTicker(el: TickerElement) {
  const override = el.onVisibilityChange;
  el.onVisibilityChange = (ents) => {
    override && override.call(el, ents);

    ents.forEach((ent) => {
      const target = ent.target as TickerElement

      if (ent.isIntersecting) {
        visibleElements.push(target)
      } else {
        const i = visibleElements.indexOf(target as TickerElement)
        if (i > -1) {
          visibleElements.splice(i, 1)
        }
      }
    })
  };

  addIntersectingObserver(el as VisibilityChangeElement);
}

// Оптимизация производительности
const isLowEndDevice = 
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  (window.innerWidth < 1024);

// Снижаем FPS на слабых устройствах для лучшей производительности
gsap.ticker.fps(isLowEndDevice ? 24 : 30);

gsap.ticker.lagSmoothing(0);

// Пауза анимаций при неактивной вкладке
let isTabVisible = !document.hidden;
document.addEventListener("visibilitychange", () => {
  isTabVisible = !document.hidden;
  if (!isTabVisible) {
    gsap.ticker.sleep();
  } else {
    gsap.ticker.wake();
  }
});

function tick(now: number) {
  // Пропускаем тики если вкладка неактивна
  if (!isTabVisible) return;
  
  for (const fn of fns) {
    fn(now)
  }

  for (const el of visibleElements) {
    el.tick.call(el, now)
  }
}

gsap.ticker.add(tick)
