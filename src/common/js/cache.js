import storage from 'good-storage'

// 取值和存值的一个标记
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  // 如果是第一次执行的话
  if (index === 0) {
    return
  } else if (index > 0) {
    arr.splice(index, 1)
  }
  // 最后把值添加到数组最前面
  arr.unshift(val)
  // 判断是否超出最大长度
  if (maxLen && arr.length > maxLen) {
    // 从最后面删除一条记录
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item.id === query.id
  }, SEARCH_MAX_LEN)
  // 设置localstorage
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 获取存储的初始值
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item.id === query.id
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}
