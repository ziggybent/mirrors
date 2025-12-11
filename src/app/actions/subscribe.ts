'use server'

type SubscribeResult = {
  success: boolean
  message?: string
  error?: string
}

export async function subscribeToKit(email: string): Promise<SubscribeResult> {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email address' }
  }

  const apiKey = process.env.KIT_API_SECRET

  if (!apiKey) {
    console.error('KIT_API_SECRET environment variable not set')
    return { success: false, error: 'Configuration error' }
  }

  try {
    // Step 1: Create subscriber
    const createResponse = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': apiKey,
      },
      body: JSON.stringify({
        email_address: email,
      }),
    })

    if (!createResponse.ok) {
      const errorData = await createResponse.json().catch(() => ({}))
      console.error('Kit create subscriber error:', errorData)
      
      // Kit returns 422 if subscriber already exists - treat as success
      if (createResponse.status === 422) {
        console.log('Subscriber already exists, continuing to add to sequence')
      } else {
        return { success: false, error: 'Failed to create subscriber' }
      }
    }

    // Step 2: Add subscriber to sequence
    const sequenceResponse = await fetch(
      'https://api.kit.com/v4/sequences/2582657/subscribers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Kit-Api-Key': apiKey,
        },
        body: JSON.stringify({
          email_address: email,
        }),
      }
    )

    if (!sequenceResponse.ok) {
      const errorData = await sequenceResponse.json().catch(() => ({}))
      console.error('Kit add to sequence error:', errorData)
      
      // If already in sequence, treat as success
      if (sequenceResponse.status === 422) {
        return { success: true, message: 'Already subscribed' }
      }
      
      return { success: false, error: 'Failed to add to sequence' }
    }

    console.log('Successfully subscribed:', email)
    return { success: true, message: 'Subscribed successfully' }
  } catch (error) {
    console.error('Kit API error:', error)
    return { success: false, error: 'Network error' }
  }
}

