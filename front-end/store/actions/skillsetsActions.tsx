import { IpaginatedSkillsets, ISkillsetsItem } from '../models'

export enum SkillsetsActionTypes {
  SEARCH_SKILLSETS = 'skillsets/search',
  SEARCHING_SKILLSETS = 'skillsets/searching',
  FOUND_SKILLSETS = 'skillsets/found',
  SEARCHING_SKILLSETS_FAILED = 'skillsets/searching_failed',

  LOAD_SKILLSETS = 'skillsets/load',
  LOADING_SKILLSETS = 'skillsets/loading',
  LOADED_SKILLSETS = 'skillsets/loaded',
  LOADING_SKILLSETS_FAILED = 'skillsets/loading_failed',

  ADD_SKILLSETS = 'skillsets/add',
  ADDING_SKILLSETS = 'skillsets/adding',
  ADDED_SKILLSETS = 'skillsets/added',
  ADDING_SKILLSETS_FAILED = 'skillsets/adding_failed',

  REMOVE_SKILLSET = 'skillsets/remove',
  REMOVING_SKILLSET = 'skillsets/removing',
  REMOVED_SKILLSET = 'skillsets/removed',
  REMOVING_SKILLSET_FAILED = 'skillsets/removing_failed',

  EDIT_SKILLSETS = 'skillsets/edit',
  EDITING_SKILLSETS = 'skillsets/editing',
  EDITED_SKILLSETS = 'skillsets/edited',
  EDITING_SKILLSETS_FAILED = 'skillsets/editing_failed',
}

export function searchSkillsets(searchOptions: TSearchOptions | string, keep?: boolean): ISearchSkillsetsAction {
  return {
    type: SkillsetsActionTypes.SEARCH_SKILLSETS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingSkillsets(): ISearchingSkillsetsAction {
  return {
    type: SkillsetsActionTypes.SEARCHING_SKILLSETS,
  }
}

export function foundSkillsets(skillsets: IpaginatedSkillsets, keep?: boolean): IFoundSkillsetsAction {
  return {
    type: SkillsetsActionTypes.FOUND_SKILLSETS,
    keep: keep,
    payload: {
      skillsets,
    },
  }
}

export function searchingSkillsetsFailed(): ISearchingSkillsetsFailedAction {
  return {
    type: SkillsetsActionTypes.SEARCHING_SKILLSETS_FAILED,
  }
}

export function loadSkillsets(loadOptions: TSearchOptions): ILoadSkillsetsAction {
  return {
    type: SkillsetsActionTypes.LOAD_SKILLSETS,
    loadOptions: loadOptions,
  }
}

export function loadingSkillsets(): ILoadingSkillsetsAction {
  return {
    type: SkillsetsActionTypes.LOADING_SKILLSETS,
  }
}

export function loadedSkillsets(skillsets: IpaginatedSkillsets): ILoadedSkillsetsAction {
  return {
    type: SkillsetsActionTypes.LOADED_SKILLSETS,
    payload: {
      skillsets,
    },
  }
}

export function loadingSkillsetsFailed(): ILoadingSkillsetsFailedAction {
  return {
    type: SkillsetsActionTypes.LOADING_SKILLSETS_FAILED,
  }
}

export function addSkillsets(skillset: ISkillsetsItem): IAddSkillsetsAction {
  return {
    type: SkillsetsActionTypes.ADD_SKILLSETS,
    payload: skillset,
  }
}

export function addingSkillsets(): IAddingSkillsetsAction {
  return {
    type: SkillsetsActionTypes.ADDING_SKILLSETS,
  }
}

export function addedSkillsets(skillsets: IpaginatedSkillsets): IAddedSkillsetsAction {
  return {
    type: SkillsetsActionTypes.ADDED_SKILLSETS,
    payload: {
      skillsets,
    },
  }
}

export function addingSkillsetsFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingSkillsetsFailedAction {
  return {
    type: SkillsetsActionTypes.ADDING_SKILLSETS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeSkillset(skillset: ISkillsetsItem): IRemoveSkillsetAction {
  return {
    type: SkillsetsActionTypes.REMOVE_SKILLSET,
    payload: skillset,
  }
}

export function removingSkillset(): IRemovingSkillsetAction {
  return {
    type: SkillsetsActionTypes.REMOVING_SKILLSET,
  }
}

export function removedSkillset(): IRemovedSkillsetAction {
  return {
    type: SkillsetsActionTypes.REMOVED_SKILLSET,
  }
}

export function removingSkillsetFailed(): IRemovingSkillsetFailedAction {
  return {
    type: SkillsetsActionTypes.REMOVING_SKILLSET_FAILED,
  }
}

export function editSkillsets(skillset: ISkillsetsItem): IEditSkillsetsAction {
  return {
    type: SkillsetsActionTypes.EDIT_SKILLSETS,
    payload: skillset,
  }
}

export function editingSkillsets(): IEditingSkillsetsAction {
  return {
    type: SkillsetsActionTypes.EDITING_SKILLSETS,
  }
}

export function editedSkillsets(skillsets: ISkillsetsItem): IEditedSkillsetsAction {
  return {
    type: SkillsetsActionTypes.EDITED_SKILLSETS,
    payload: skillsets,
  }
}

export function editingSkillsetsFailed(): IEditingSkillsetsFailedAction {
  return {
    type: SkillsetsActionTypes.EDITING_SKILLSETS_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchSkillsetsAction {
  type: SkillsetsActionTypes.SEARCH_SKILLSETS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingSkillsetsAction {
  type: SkillsetsActionTypes.SEARCHING_SKILLSETS
}

export interface IFoundSkillsetsAction {
  type: SkillsetsActionTypes.FOUND_SKILLSETS
  keep?: boolean
  payload: {
    skillsets: IpaginatedSkillsets
  }
}

export interface ISearchingSkillsetsFailedAction {
  type: SkillsetsActionTypes.SEARCHING_SKILLSETS_FAILED
}

export interface ILoadSkillsetsAction {
  type: SkillsetsActionTypes.LOAD_SKILLSETS
  loadOptions: TSearchOptions
}

export interface ILoadingSkillsetsAction {
  type: SkillsetsActionTypes.LOADING_SKILLSETS
}

export interface ILoadedSkillsetsAction {
  type: SkillsetsActionTypes.LOADED_SKILLSETS
  payload: {
    skillsets: IpaginatedSkillsets
  }
}

export interface ILoadingSkillsetsFailedAction {
  type: SkillsetsActionTypes.LOADING_SKILLSETS_FAILED
}

export interface IAddSkillsetsAction {
  type: SkillsetsActionTypes.ADD_SKILLSETS
  payload: ISkillsetsItem
}

export interface IAddingSkillsetsAction {
  type: SkillsetsActionTypes.ADDING_SKILLSETS
}

export interface IAddedSkillsetsAction {
  type: SkillsetsActionTypes.ADDED_SKILLSETS
  payload: {
    skillsets: IpaginatedSkillsets
  }
}

export interface IAddingSkillsetsFailedAction {
  type: SkillsetsActionTypes.ADDING_SKILLSETS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveSkillsetAction {
  type: SkillsetsActionTypes.REMOVE_SKILLSET
  payload: ISkillsetsItem
}

export interface IRemovingSkillsetAction {
  type: SkillsetsActionTypes.REMOVING_SKILLSET
}

export interface IRemovedSkillsetAction {
  type: SkillsetsActionTypes.REMOVED_SKILLSET
}

export interface IRemovingSkillsetFailedAction {
  type: SkillsetsActionTypes.REMOVING_SKILLSET_FAILED
}

export interface IEditSkillsetsAction {
  type: SkillsetsActionTypes.EDIT_SKILLSETS
  payload: ISkillsetsItem
}

export interface IEditingSkillsetsAction {
  type: SkillsetsActionTypes.EDITING_SKILLSETS
}

export interface IEditedSkillsetsAction {
  type: SkillsetsActionTypes.EDITED_SKILLSETS
  payload: ISkillsetsItem
}

export interface IEditingSkillsetsFailedAction {
  type: SkillsetsActionTypes.EDITING_SKILLSETS_FAILED
}

export type SkillsetsAction =
  | ISearchSkillsetsAction
  | ISearchingSkillsetsAction
  | IFoundSkillsetsAction
  | ISearchingSkillsetsFailedAction
  | ILoadSkillsetsAction
  | ILoadingSkillsetsAction
  | ILoadedSkillsetsAction
  | ILoadingSkillsetsFailedAction
  | IAddSkillsetsAction
  | IAddingSkillsetsAction
  | IAddedSkillsetsAction
  | IAddingSkillsetsFailedAction
  | IRemoveSkillsetAction
  | IRemovingSkillsetAction
  | IRemovedSkillsetAction
  | IRemovingSkillsetFailedAction
  | IEditSkillsetsAction
  | IEditingSkillsetsAction
  | IEditedSkillsetsAction
  | IEditingSkillsetsFailedAction
