import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedProjects,
  addingProjects,
  addingProjectsFailed,
  editedProjects,
  editingProjects,
  editingProjectsFailed,
  foundProjects,
  loadedProjects,
  loadingProjects,
  loadingProjectsFailed,
  ProjectsAction,
  ProjectsActionTypes,
  removedProject,
  removingProject,
  removingProjectFailed,
  searchingProjects,
  searchingProjectsFailed,
} from '../actions/projectsActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchProjectsEpic: Epic<ProjectsAction, ProjectsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProjectsActionTypes.SEARCH_PROJECTS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/projects/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundProjects(response.data, action.keep)),
        startWith(searchingProjects()),
        catchError(() => of(searchingProjectsFailed()))
      )
    })
  )

const loadProjectsEpic: Epic<ProjectsAction, ProjectsAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(ProjectsActionTypes.LOAD_PROJECTS)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/projects/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedProjects(response.data)),
        startWith(loadingProjects()),
        catchError(() => of(loadingProjectsFailed()))
      )
    })
  )
}

const addProjectsEpic: Epic<ProjectsAction, ProjectsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProjectsActionTypes.ADD_PROJECTS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/projects/`, data, config)).pipe(
        map((response) => addedProjects(response.data)),
        startWith(addingProjects()),
        catchError((err) => of(addingProjectsFailed(err.response)))
      )
    })
  )

const removeProjectsEpic: Epic<ProjectsAction, ProjectsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProjectsActionTypes.REMOVE_PROJECT)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/projects/${action.payload._id}`)).pipe(
        map((response) => removedProject()),
        startWith(removingProject()),
        catchError(() => of(removingProjectFailed()))
      )
    )
  )

const editProjectsEpic: Epic<ProjectsAction, ProjectsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ProjectsActionTypes.EDIT_PROJECTS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/projects/${action.payload._id}`, data, config)).pipe(
        map((response) => editedProjects(response.data)),
        startWith(editingProjects()),
        catchError(() => of(editingProjectsFailed()))
      )
    })
  )

export default combineEpics(searchProjectsEpic, loadProjectsEpic, addProjectsEpic, removeProjectsEpic, editProjectsEpic)
