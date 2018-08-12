export function hasClass(el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let lastClass = el.className.split(' ')
  lastClass.push(className)
  el.className = lastClass.join(' ')
}

export function data(el, name, val) {
  const prefix = 'data-'
  if (val) {
    el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}
