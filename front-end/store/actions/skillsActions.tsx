import { IpaginatedSkills, ISkillsItem } from '../models'

export enum SkillsActionTypes {
  SEARCH_SKILLS = 'skills/search',
  SEARCHING_SKILLS = 'skills/searching',
  FOUND_SKILLS = 'skills/found',
  SEARCHING_SKILLS_FAILED = 'skills/searching_failed',

  LOAD_SKILLS = 'skills/load',
  LOADING_SKILLS = 'skills/loading',
  LOADED_SKILLS = 'skills/loaded',
  LOADING_SKILLS_FAILED = 'skills/loading_failed',

  ADD_SKILLS = 'skills/add',
  ADDING_SKILLS = 'skills/adding',
  ADDED_SKILLS = 'skills/added',
  ADDING_SKILLS_FAILED = 'skills/adding_failed',

  REMOVE_SKILL = 'skills/remove',
  REMOVING_SKILL = 'skills/removing',
  REMOVED_SKILL = 'skills/removed',
  REMOVING_SKILL_FAILED = 'skills/removing_failed',

  EDIT_SKILLS = 'skills/edit',
  EDITING_SKILLS = 'skills/editing',
  EDITED_SKILLS = 'skills/edited',
  EDITING_SKILLS_FAILED = 'skills/editing_failed',
}

export function searchSkills(searchOptions: TSearchOptions | string, keep?: boolean): ISearchSkillsAction {
  return {
    type: SkillsActionTypes.SEARCH_SKILLS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingSkills(): ISearchingSkillsAction {
  return {
    type: SkillsActionTypes.SEARCHING_SKILLS,
  }
}

export function foundSkills(skills: IpaginatedSkills, keep?: boolean): IFoundSkillsAction {
  return {
    type: SkillsActionTypes.FOUND_SKILLS,
    keep: keep,
    payload: {
      skills,
    },
  }
}

export function searchingSkillsFailed(): ISearchingSkillsFailedAction {
  return {
    type: SkillsActionTypes.SEARCHING_SKILLS_FAILED,
  }
}

export function loadSkills(loadOptions: TSearchOptions): ILoadSkillsAction {
  return {
    type: SkillsActionTypes.LOAD_SKILLS,
    loadOptions: loadOptions,
  }
}

export function loadingSkills(): ILoadingSkillsAction {
  return {
    type: SkillsActionTypes.LOADING_SKILLS,
  }
}

export function loadedSkills(skills: IpaginatedSkills): ILoadedSkillsAction {
  return {
    type: SkillsActionTypes.LOADED_SKILLS,
    payload: {
      skills,
    },
  }
}

export function loadingSkillsFailed(): ILoadingSkillsFailedAction {
  return {
    type: SkillsActionTypes.LOADING_SKILLS_FAILED,
  }
}

export function addSkills(skill: ISkillsItem): IAddSkillsAction {
  return {
    type: SkillsActionTypes.ADD_SKILLS,
    payload: skill,
  }
}

export function addingSkills(): IAddingSkillsAction {
  return {
    type: SkillsActionTypes.ADDING_SKILLS,
  }
}

export function addedSkills(skills: IpaginatedSkills): IAddedSkillsAction {
  return {
    type: SkillsActionTypes.ADDED_SKILLS,
    payload: {
      skills,
    },
  }
}

export function addingSkillsFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingSkillsFailedAction {
  return {
    type: SkillsActionTypes.ADDING_SKILLS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeSkill(skill: ISkillsItem): IRemoveSkillAction {
  return {
    type: SkillsActionTypes.REMOVE_SKILL,
    payload: skill,
  }
}

export function removingSkill(): IRemovingSkillAction {
  return {
    type: SkillsActionTypes.REMOVING_SKILL,
  }
}

export function removedSkill(): IRemovedSkillAction {
  return {
    type: SkillsActionTypes.REMOVED_SKILL,
  }
}

export function removingSkillFailed(): IRemovingSkillFailedAction {
  return {
    type: SkillsActionTypes.REMOVING_SKILL_FAILED,
  }
}

export function editSkills(skill: ISkillsItem): IEditSkillsAction {
  return {
    type: SkillsActionTypes.EDIT_SKILLS,
    payload: skill,
  }
}

export function editingSkills(): IEditingSkillsAction {
  return {
    type: SkillsActionTypes.EDITING_SKILLS,
  }
}

export function editedSkills(skills: ISkillsItem): IEditedSkillsAction {
  return {
    type: SkillsActionTypes.EDITED_SKILLS,
    payload: skills,
  }
}

export function editingSkillsFailed(): IEditingSkillsFailedAction {
  return {
    type: SkillsActionTypes.EDITING_SKILLS_FAILED,
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

export interface ISearchSkillsAction {
  type: SkillsActionTypes.SEARCH_SKILLS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingSkillsAction {
  type: SkillsActionTypes.SEARCHING_SKILLS
}

export interface IFoundSkillsAction {
  type: SkillsActionTypes.FOUND_SKILLS
  keep?: boolean
  payload: {
    skills: IpaginatedSkills
  }
}

export interface ISearchingSkillsFailedAction {
  type: SkillsActionTypes.SEARCHING_SKILLS_FAILED
}

export interface ILoadSkillsAction {
  type: SkillsActionTypes.LOAD_SKILLS
  loadOptions: TSearchOptions
}

export interface ILoadingSkillsAction {
  type: SkillsActionTypes.LOADING_SKILLS
}

export interface ILoadedSkillsAction {
  type: SkillsActionTypes.LOADED_SKILLS
  payload: {
    skills: IpaginatedSkills
  }
}

export interface ILoadingSkillsFailedAction {
  type: SkillsActionTypes.LOADING_SKILLS_FAILED
}

export interface IAddSkillsAction {
  type: SkillsActionTypes.ADD_SKILLS
  payload: ISkillsItem
}

export interface IAddingSkillsAction {
  type: SkillsActionTypes.ADDING_SKILLS
}

export interface IAddedSkillsAction {
  type: SkillsActionTypes.ADDED_SKILLS
  payload: {
    skills: IpaginatedSkills
  }
}

export interface IAddingSkillsFailedAction {
  type: SkillsActionTypes.ADDING_SKILLS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveSkillAction {
  type: SkillsActionTypes.REMOVE_SKILL
  payload: ISkillsItem
}

export interface IRemovingSkillAction {
  type: SkillsActionTypes.REMOVING_SKILL
}

export interface IRemovedSkillAction {
  type: SkillsActionTypes.REMOVED_SKILL
}

export interface IRemovingSkillFailedAction {
  type: SkillsActionTypes.REMOVING_SKILL_FAILED
}

export interface IEditSkillsAction {
  type: SkillsActionTypes.EDIT_SKILLS
  payload: ISkillsItem
}

export interface IEditingSkillsAction {
  type: SkillsActionTypes.EDITING_SKILLS
}

export interface IEditedSkillsAction {
  type: SkillsActionTypes.EDITED_SKILLS
  payload: ISkillsItem
}

export interface IEditingSkillsFailedAction {
  type: SkillsActionTypes.EDITING_SKILLS_FAILED
}

export type SkillsAction =
  | ISearchSkillsAction
  | ISearchingSkillsAction
  | IFoundSkillsAction
  | ISearchingSkillsFailedAction
  | ILoadSkillsAction
  | ILoadingSkillsAction
  | ILoadedSkillsAction
  | ILoadingSkillsFailedAction
  | IAddSkillsAction
  | IAddingSkillsAction
  | IAddedSkillsAction
  | IAddingSkillsFailedAction
  | IRemoveSkillAction
  | IRemovingSkillAction
  | IRemovedSkillAction
  | IRemovingSkillFailedAction
  | IEditSkillsAction
  | IEditingSkillsAction
  | IEditedSkillsAction
  | IEditingSkillsFailedAction
