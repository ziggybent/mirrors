import posthog from 'posthog-js'

export function initPostHog() {
  if (typeof window !== 'undefined') {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

    if (!apiKey) {
      console.warn('PostHog API key not found. Analytics will not be tracked.')
      return
    }

    posthog.init(apiKey, {
      api_host: host,
      autocapture: true,
      capture_pageview: false, // We'll handle this manually in the provider
      disable_session_recording: false,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog loaded')
        }
      },
    })
  }
}

export { posthog }

