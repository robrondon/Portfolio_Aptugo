import { IpaginatedProjects, IProjectsItem } from '../models'

export enum ProjectsActionTypes {
  SEARCH_PROJECTS = 'projects/search',
  SEARCHING_PROJECTS = 'projects/searching',
  FOUND_PROJECTS = 'projects/found',
  SEARCHING_PROJECTS_FAILED = 'projects/searching_failed',

  LOAD_PROJECTS = 'projects/load',
  LOADING_PROJECTS = 'projects/loading',
  LOADED_PROJECTS = 'projects/loaded',
  LOADING_PROJECTS_FAILED = 'projects/loading_failed',

  ADD_PROJECTS = 'projects/add',
  ADDING_PROJECTS = 'projects/adding',
  ADDED_PROJECTS = 'projects/added',
  ADDING_PROJECTS_FAILED = 'projects/adding_failed',

  REMOVE_PROJECT = 'projects/remove',
  REMOVING_PROJECT = 'projects/removing',
  REMOVED_PROJECT = 'projects/removed',
  REMOVING_PROJECT_FAILED = 'projects/removing_failed',

  EDIT_PROJECTS = 'projects/edit',
  EDITING_PROJECTS = 'projects/editing',
  EDITED_PROJECTS = 'projects/edited',
  EDITING_PROJECTS_FAILED = 'projects/editing_failed',
}

export function searchProjects(searchOptions: TSearchOptions | string, keep?: boolean): ISearchProjectsAction {
  return {
    type: ProjectsActionTypes.SEARCH_PROJECTS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingProjects(): ISearchingProjectsAction {
  return {
    type: ProjectsActionTypes.SEARCHING_PROJECTS,
  }
}

export function foundProjects(projects: IpaginatedProjects, keep?: boolean): IFoundProjectsAction {
  return {
    type: ProjectsActionTypes.FOUND_PROJECTS,
    keep: keep,
    payload: {
      projects,
    },
  }
}

export function searchingProjectsFailed(): ISearchingProjectsFailedAction {
  return {
    type: ProjectsActionTypes.SEARCHING_PROJECTS_FAILED,
  }
}

export function loadProjects(loadOptions: TSearchOptions): ILoadProjectsAction {
  return {
    type: ProjectsActionTypes.LOAD_PROJECTS,
    loadOptions: loadOptions,
  }
}

export function loadingProjects(): ILoadingProjectsAction {
  return {
    type: ProjectsActionTypes.LOADING_PROJECTS,
  }
}

export function loadedProjects(projects: IpaginatedProjects): ILoadedProjectsAction {
  return {
    type: ProjectsActionTypes.LOADED_PROJECTS,
    payload: {
      projects,
    },
  }
}

export function loadingProjectsFailed(): ILoadingProjectsFailedAction {
  return {
    type: ProjectsActionTypes.LOADING_PROJECTS_FAILED,
  }
}

export function addProjects(project: IProjectsItem): IAddProjectsAction {
  return {
    type: ProjectsActionTypes.ADD_PROJECTS,
    payload: project,
  }
}

export function addingProjects(): IAddingProjectsAction {
  return {
    type: ProjectsActionTypes.ADDING_PROJECTS,
  }
}

export function addedProjects(projects: IpaginatedProjects): IAddedProjectsAction {
  return {
    type: ProjectsActionTypes.ADDED_PROJECTS,
    payload: {
      projects,
    },
  }
}

export function addingProjectsFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingProjectsFailedAction {
  return {
    type: ProjectsActionTypes.ADDING_PROJECTS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeProject(project: IProjectsItem): IRemoveProjectAction {
  return {
    type: ProjectsActionTypes.REMOVE_PROJECT,
    payload: project,
  }
}

export function removingProject(): IRemovingProjectAction {
  return {
    type: ProjectsActionTypes.REMOVING_PROJECT,
  }
}

export function removedProject(): IRemovedProjectAction {
  return {
    type: ProjectsActionTypes.REMOVED_PROJECT,
  }
}

export function removingProjectFailed(): IRemovingProjectFailedAction {
  return {
    type: ProjectsActionTypes.REMOVING_PROJECT_FAILED,
  }
}

export function editProjects(project: IProjectsItem): IEditProjectsAction {
  return {
    type: ProjectsActionTypes.EDIT_PROJECTS,
    payload: project,
  }
}

export function editingProjects(): IEditingProjectsAction {
  return {
    type: ProjectsActionTypes.EDITING_PROJECTS,
  }
}

export function editedProjects(projects: IProjectsItem): IEditedProjectsAction {
  return {
    type: ProjectsActionTypes.EDITED_PROJECTS,
    payload: projects,
  }
}

export function editingProjectsFailed(): IEditingProjectsFailedAction {
  return {
    type: ProjectsActionTypes.EDITING_PROJECTS_FAILED,
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

export interface ISearchProjectsAction {
  type: ProjectsActionTypes.SEARCH_PROJECTS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingProjectsAction {
  type: ProjectsActionTypes.SEARCHING_PROJECTS
}

export interface IFoundProjectsAction {
  type: ProjectsActionTypes.FOUND_PROJECTS
  keep?: boolean
  payload: {
    projects: IpaginatedProjects
  }
}

export interface ISearchingProjectsFailedAction {
  type: ProjectsActionTypes.SEARCHING_PROJECTS_FAILED
}

export interface ILoadProjectsAction {
  type: ProjectsActionTypes.LOAD_PROJECTS
  loadOptions: TSearchOptions
}

export interface ILoadingProjectsAction {
  type: ProjectsActionTypes.LOADING_PROJECTS
}

export interface ILoadedProjectsAction {
  type: ProjectsActionTypes.LOADED_PROJECTS
  payload: {
    projects: IpaginatedProjects
  }
}

export interface ILoadingProjectsFailedAction {
  type: ProjectsActionTypes.LOADING_PROJECTS_FAILED
}

export interface IAddProjectsAction {
  type: ProjectsActionTypes.ADD_PROJECTS
  payload: IProjectsItem
}

export interface IAddingProjectsAction {
  type: ProjectsActionTypes.ADDING_PROJECTS
}

export interface IAddedProjectsAction {
  type: ProjectsActionTypes.ADDED_PROJECTS
  payload: {
    projects: IpaginatedProjects
  }
}

export interface IAddingProjectsFailedAction {
  type: ProjectsActionTypes.ADDING_PROJECTS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveProjectAction {
  type: ProjectsActionTypes.REMOVE_PROJECT
  payload: IProjectsItem
}

export interface IRemovingProjectAction {
  type: ProjectsActionTypes.REMOVING_PROJECT
}

export interface IRemovedProjectAction {
  type: ProjectsActionTypes.REMOVED_PROJECT
}

export interface IRemovingProjectFailedAction {
  type: ProjectsActionTypes.REMOVING_PROJECT_FAILED
}

export interface IEditProjectsAction {
  type: ProjectsActionTypes.EDIT_PROJECTS
  payload: IProjectsItem
}

export interface IEditingProjectsAction {
  type: ProjectsActionTypes.EDITING_PROJECTS
}

export interface IEditedProjectsAction {
  type: ProjectsActionTypes.EDITED_PROJECTS
  payload: IProjectsItem
}

export interface IEditingProjectsFailedAction {
  type: ProjectsActionTypes.EDITING_PROJECTS_FAILED
}

export type ProjectsAction =
  | ISearchProjectsAction
  | ISearchingProjectsAction
  | IFoundProjectsAction
  | ISearchingProjectsFailedAction
  | ILoadProjectsAction
  | ILoadingProjectsAction
  | ILoadedProjectsAction
  | ILoadingProjectsFailedAction
  | IAddProjectsAction
  | IAddingProjectsAction
  | IAddedProjectsAction
  | IAddingProjectsFailedAction
  | IRemoveProjectAction
  | IRemovingProjectAction
  | IRemovedProjectAction
  | IRemovingProjectFailedAction
  | IEditProjectsAction
  | IEditingProjectsAction
  | IEditedProjectsAction
  | IEditingProjectsFailedAction
