import { NuxtConfig } from '@nuxt/types'
import { PhoneInterface } from '~/interfaces/PhoneInterface'
import { MissingApiBaseUrlError } from '~/errors/MissingApiBaseUrlError'
import { ServerError } from '~/errors/ServerError'

export class PhoneService {
  public constructor(private readonly config: NuxtConfig) {
    if (!config.apiBaseUrl) throw new MissingApiBaseUrlError()
  }

  public async getPhones(): Promise<PhoneInterface[]> {
    try {
      const response = await fetch(`${this.config.apiBaseUrl}GetPhones`)

      if (response.status === 500) throw new ServerError()

      return await response.json()
    } catch (error) {
      console.error(error)
    }

    return []
  }
}
