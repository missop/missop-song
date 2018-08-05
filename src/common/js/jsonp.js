import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + params(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// 把对象转化为key=value形式
export function params(data) {
  let result = ''
  for (let dataKey in data) {
    let value = data[dataKey] !== undefined ? data[dataKey] : ''
    result += `&${dataKey}=${encodeURIComponent(value)}`
  }
  return result ? result.substring(1) : ''
}
