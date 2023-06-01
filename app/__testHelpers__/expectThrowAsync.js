/**
 * Test helper to test async functions to throw
 * expected errors
 * @param fn
 * @param message
 * @returns {Promise<void>}
 */
export const expectThrowAsync = async ({ fn, message }) => {
  let catched = false
  try {
    await fn()
  }
  catch (e) {
    expect(e.message).toEqual(message)
    catched = true
  }
  finally {
    expect(catched).toEqual(true)
  }
}
