// @flow
export default function isPromise (stuff: *): boolean {
  if ('object' != typeof stuff)       return false
  if ('function' != typeof stuff.then)  return false
  if ('function' != typeof stuff.catch) return false
  return true
}
