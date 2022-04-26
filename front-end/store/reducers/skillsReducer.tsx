import produce from 'immer'
import { SkillsAction, SkillsActionTypes } from '../actions/skillsActions'
import { ApiStatus, ISkillsItem } from '../models'

export const initialSkillsState: ISkillsState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  skills: [],
  foundskills: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function skillsReducer(state: ISkillsState = initialSkillsState, action: SkillsAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SkillsActionTypes.SEARCH_SKILLS:
        draft.searchString = action.searchOptions.searchString
        break
      case SkillsActionTypes.SEARCHING_SKILLS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case SkillsActionTypes.SEARCHING_SKILLS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case SkillsActionTypes.FOUND_SKILLS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundskills.push(...action.payload.skills.docs) : (draft.foundskills = action.payload.skills.docs)
        draft.totalDocs = action.payload.skills.totalDocs
        break

      case SkillsActionTypes.LOAD_SKILLS:
      case SkillsActionTypes.LOADING_SKILLS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundskills = []
        break

      case SkillsActionTypes.LOADING_SKILLS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case SkillsActionTypes.LOADED_SKILLS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.skills = action.payload.skills.docs
        draft.totalDocs = action.payload.skills.totalDocs
        break

      case SkillsActionTypes.ADD_SKILLS:
      case SkillsActionTypes.ADDING_SKILLS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case SkillsActionTypes.ADDING_SKILLS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case SkillsActionTypes.ADDED_SKILLS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.skills.push(action.payload.skills.docs[0])
        if (draft.searchString) draft.foundskills.push(action.payload.skills.docs[0])
        break

      case SkillsActionTypes.REMOVE_SKILL:
        draft.skills.splice(
          draft.skills.findIndex((skill) => skill._id === action.payload._id),
          1
        )
        break

      case SkillsActionTypes.EDIT_SKILLS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.skills[draft.skills.findIndex((skill) => skill._id === action.payload._id)] = action.payload
        break

      case SkillsActionTypes.EDITED_SKILLS:
        draft.addingStatus = ApiStatus.LOADED
        draft.skills[draft.skills.findIndex((skill) => skill._id === action.payload._id)] = action.payload
        draft.foundskills[draft.foundskills.findIndex((skill) => skill._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface ISkillsState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  skills: ISkillsItem[]
  foundskills: ISkillsItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
