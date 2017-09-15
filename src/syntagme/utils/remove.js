export default function remove (array, element) {
  let clone = array
  let index = array.indexOf(element)
  if (index) {
    clone.splice(array.indexOf(element), 1)
  }
  return clone
}
