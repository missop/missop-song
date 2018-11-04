import * as types from './mutation-types'
import {shuffle} from 'common/js/util'
import {playMode} from 'common/js/config'
import {saveSearch, deleteSearch, clearSearch} from 'common/js/cache'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  if (state.mode === playMode.random) {
    const randomList = shuffle(list)
    const randomIndex = findIndex(randomList, list[index])
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, randomIndex)
  } else {
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, index)
  }
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  const randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit, state}, song) {
  console.log(state.playList)
  console.log(state.sequenceList)
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  console.log(playList[currentIndex])
  let currentSong = playList[currentIndex]
  // 寻找song在歌曲中的位置
  let fpIndex = findIndex(playList, song)
  // 插入歌曲，索引加一
  currentIndex++
  // 插入歌曲
  playList.splice(currentIndex, 0, song)
  // 如果列表中已经有这首歌曲
  if (fpIndex > -1) {
// 如果当前插入的序号大于列表中的序号,则直接删掉前面那个元素
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      // 如果当前插入序号小于等于列表中序号，则要把删除的序号加一
      playList.splice(fpIndex + 1, 1)
    }
  }
  // 拿到playList之后就需要计算sequenceList
  // 这需要一个当前歌曲在sequenceList中的索引值
  let currentSequenceIndex = findIndex(sequenceList, currentSong) + 1
  // 下面就和上面差不多了
  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSequenceIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSequenceIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  console.log(playList, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
