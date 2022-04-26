import produce from 'immer'
import { SkillsetsAction, SkillsetsActionTypes } from '../actions/skillsetsActions'
import { ApiStatus, ISkillsetsItem } from '../models'

export const initialSkillsetsState: ISkillsetsState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  skillsets: [],
  foundskillsets: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function skillsetsReducer(state: ISkillsetsState = initialSkillsetsState, action: SkillsetsAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SkillsetsActionTypes.SEARCH_SKILLSETS:
        draft.searchString = action.searchOptions.searchString
        break
      case SkillsetsActionTypes.SEARCHING_SKILLSETS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case SkillsetsActionTypes.SEARCHING_SKILLSETS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case SkillsetsActionTypes.FOUND_SKILLSETS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundskillsets.push(...action.payload.skillsets.docs) : (draft.foundskillsets = action.payload.skillsets.docs)
        draft.totalDocs = action.payload.skillsets.totalDocs
        break

      case SkillsetsActionTypes.LOAD_SKILLSETS:
      case SkillsetsActionTypes.LOADING_SKILLSETS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundskillsets = []
        break

      case SkillsetsActionTypes.LOADING_SKILLSETS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case SkillsetsActionTypes.LOADED_SKILLSETS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.skillsets = action.payload.skillsets.docs
        draft.totalDocs = action.payload.skillsets.totalDocs
        break

      case SkillsetsActionTypes.ADD_SKILLSETS:
      case SkillsetsActionTypes.ADDING_SKILLSETS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case SkillsetsActionTypes.ADDING_SKILLSETS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case SkillsetsActionTypes.ADDED_SKILLSETS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.skillsets.push(action.payload.skillsets.docs[0])
        if (draft.searchString) draft.foundskillsets.push(action.payload.skillsets.docs[0])
        break

      case SkillsetsActionTypes.REMOVE_SKILLSET:
        draft.skillsets.splice(
          draft.skillsets.findIndex((skillset) => skillset._id === action.payload._id),
          1
        )
        break

      case SkillsetsActionTypes.EDIT_SKILLSETS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.skillsets[draft.skillsets.findIndex((skillset) => skillset._id === action.payload._id)] = action.payload
        break

      case SkillsetsActionTypes.EDITED_SKILLSETS:
        draft.addingStatus = ApiStatus.LOADED
        draft.skillsets[draft.skillsets.findIndex((skillset) => skillset._id === action.payload._id)] = action.payload
        draft.foundskillsets[draft.foundskillsets.findIndex((skillset) => skillset._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface ISkillsetsState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  skillsets: ISkillsetsItem[]
  foundskillsets: ISkillsetsItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
