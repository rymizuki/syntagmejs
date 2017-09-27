// @flow
export default function (stuff: *) {
  if ('object' != typeof stuff) return false
  if (Array.isArray(stuff))     return false
  return stuff
}
