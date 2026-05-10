declare global { interface Window { ym?: (...args: any[]) => void } }

export function enableAnalytics() {
  if (!process.client) return
  const config = useRuntimeConfig()
  const counterId = config.public.ymId
  if (!counterId || window.ym) return
  ;(function (m: any, e: Document, t: string, r: string, i: string) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) }
    m[i].l = Date.now()
    const k = e.createElement(t) as HTMLScriptElement
    const a = e.getElementsByTagName(t)[0]
    k.async = true
    k.src = r
    if (a?.parentNode) a.parentNode.insertBefore(k, a)
    else e.head.appendChild(k)
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')
  const ym = window.ym as ((...args: any[]) => void) | undefined
  ym?.(Number(counterId), 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false })
}

export function trackGoal(goal: string, params: Record<string, any> = {}) {
  if (!process.client || !window.ym) return
  const counterId = useRuntimeConfig().public.ymId
  if (!counterId) return
  window.ym(Number(counterId), 'reachGoal', goal, params)
}
