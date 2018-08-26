import * as typs from './mutation-types'

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(typs.SET_PLAYLIST, list)
  commit(typs.SET_SEQUENCE_LIST, list)
  commit(typs.SET_CURRENT_INDEX, index)
  commit(typs.SET_FULL_SCREEN, true)
  commit(typs.SET_PLAYING_STATE, true)
}
