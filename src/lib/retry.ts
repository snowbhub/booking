/** Upstream implementation note. */

export type Outcome<T> = { failed: false; value: T } | { failed: true; error: unknown }

export interface RetryOptions {
  /** Upstream implementation note. */
  delaysMs: number[]
  /** Tiempo total tras el cual no se empieza otra espera. */
  budgetMs?: number
  sleep?: (ms: number) => Promise<void>
  now?: () => number
}

const defaultSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

/** Upstream implementation note. */
export async function retrying<T>(run: () => Promise<T>, retryable: (outcome: Outcome<T>) => boolean, options: RetryOptions): Promise<T> {
  const { delaysMs, budgetMs = Infinity, sleep = defaultSleep, now = Date.now } = options
  const start = now()
  for (let attempt = 0; ; attempt++) {
    let outcome: Outcome<T>
    try {
      outcome = { failed: false, value: await run() }
    } catch (error) {
      outcome = { failed: true, error }
    }
    const delay = delaysMs[attempt]
    const again = delay !== undefined && retryable(outcome) && now() - start + delay < budgetMs
    if (!again) {
      if (outcome.failed) throw outcome.error
      return outcome.value
    }
    await sleep(delay)
  }
}
