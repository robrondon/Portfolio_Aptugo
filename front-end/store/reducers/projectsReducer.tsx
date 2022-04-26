import produce from 'immer'
import { ProjectsAction, ProjectsActionTypes } from '../actions/projectsActions'
import { ApiStatus, IProjectsItem } from '../models'

export const initialProjectsState: IProjectsState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  projects: [],
  foundprojects: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function projectsReducer(state: IProjectsState = initialProjectsState, action: ProjectsAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ProjectsActionTypes.SEARCH_PROJECTS:
        draft.searchString = action.searchOptions.searchString
        break
      case ProjectsActionTypes.SEARCHING_PROJECTS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case ProjectsActionTypes.SEARCHING_PROJECTS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case ProjectsActionTypes.FOUND_PROJECTS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundprojects.push(...action.payload.projects.docs) : (draft.foundprojects = action.payload.projects.docs)
        draft.totalDocs = action.payload.projects.totalDocs
        break

      case ProjectsActionTypes.LOAD_PROJECTS:
      case ProjectsActionTypes.LOADING_PROJECTS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundprojects = []
        break

      case ProjectsActionTypes.LOADING_PROJECTS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case ProjectsActionTypes.LOADED_PROJECTS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.projects = action.payload.projects.docs
        draft.totalDocs = action.payload.projects.totalDocs
        break

      case ProjectsActionTypes.ADD_PROJECTS:
      case ProjectsActionTypes.ADDING_PROJECTS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case ProjectsActionTypes.ADDING_PROJECTS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case ProjectsActionTypes.ADDED_PROJECTS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.projects.push(action.payload.projects.docs[0])
        if (draft.searchString) draft.foundprojects.push(action.payload.projects.docs[0])
        break

      case ProjectsActionTypes.REMOVE_PROJECT:
        draft.projects.splice(
          draft.projects.findIndex((project) => project._id === action.payload._id),
          1
        )
        break

      case ProjectsActionTypes.EDIT_PROJECTS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.projects[draft.projects.findIndex((project) => project._id === action.payload._id)] = action.payload
        break

      case ProjectsActionTypes.EDITED_PROJECTS:
        draft.addingStatus = ApiStatus.LOADED
        draft.projects[draft.projects.findIndex((project) => project._id === action.payload._id)] = action.payload
        draft.foundprojects[draft.foundprojects.findIndex((project) => project._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface IProjectsState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  projects: IProjectsItem[]
  foundprojects: IProjectsItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
