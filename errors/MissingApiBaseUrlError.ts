export class MissingApiBaseUrlError extends Error {
  public constructor() {
    super('Missing api base url environment variable')
  }
}
