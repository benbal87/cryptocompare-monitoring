/**
 * Checks if the given argument is a string.
 * @param {unknown} arg - The argument to check.
 * @return {arg is string} Returns true if the argument is a string, false
 *   otherwise.
 */
export const isString = (arg: unknown): arg is string =>
  typeof arg === 'string' || arg instanceof String

/**
 * Checks if the given argument is a non-empty string.
 * @param {unknown} str - The string to check.
 * @return {str is string} Returns true if the argument is a non-empty string,
 *   false otherwise.
 */
export const isStringNotEmpty = (str: unknown): str is string =>
  isString(str) && str.length > 0

/**
 * Validates an API key.
 * @param {string} apiKey - The API key to validate.
 * @return {boolean} Returns true if the API key is valid, false otherwise.
 */
export const validateApiKey = (apiKey: unknown): boolean =>
  /^[a-f0-9]{64}$/.test(apiKey as string)