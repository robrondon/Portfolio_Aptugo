import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedSkillsets,
  addingSkillsets,
  addingSkillsetsFailed,
  editedSkillsets,
  editingSkillsets,
  editingSkillsetsFailed,
  foundSkillsets,
  loadedSkillsets,
  loadingSkillsets,
  loadingSkillsetsFailed,
  removedSkillset,
  removingSkillset,
  removingSkillsetFailed,
  searchingSkillsets,
  searchingSkillsetsFailed,
  SkillsetsAction,
  SkillsetsActionTypes,
} from '../actions/skillsetsActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchSkillsetsEpic: Epic<SkillsetsAction, SkillsetsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SkillsetsActionTypes.SEARCH_SKILLSETS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/skillsets/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundSkillsets(response.data, action.keep)),
        startWith(searchingSkillsets()),
        catchError(() => of(searchingSkillsetsFailed()))
      )
    })
  )

const loadSkillsetsEpic: Epic<SkillsetsAction, SkillsetsAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(SkillsetsActionTypes.LOAD_SKILLSETS)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/skillsets/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedSkillsets(response.data)),
        startWith(loadingSkillsets()),
        catchError(() => of(loadingSkillsetsFailed()))
      )
    })
  )
}

const addSkillsetsEpic: Epic<SkillsetsAction, SkillsetsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SkillsetsActionTypes.ADD_SKILLSETS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/skillsets/`, data, config)).pipe(
        map((response) => addedSkillsets(response.data)),
        startWith(addingSkillsets()),
        catchError((err) => of(addingSkillsetsFailed(err.response)))
      )
    })
  )

const removeSkillsetsEpic: Epic<SkillsetsAction, SkillsetsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SkillsetsActionTypes.REMOVE_SKILLSET)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/skillsets/${action.payload._id}`)).pipe(
        map((response) => removedSkillset()),
        startWith(removingSkillset()),
        catchError(() => of(removingSkillsetFailed()))
      )
    )
  )

const editSkillsetsEpic: Epic<SkillsetsAction, SkillsetsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SkillsetsActionTypes.EDIT_SKILLSETS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/skillsets/${action.payload._id}`, data, config)).pipe(
        map((response) => editedSkillsets(response.data)),
        startWith(editingSkillsets()),
        catchError(() => of(editingSkillsetsFailed()))
      )
    })
  )

export default combineEpics(searchSkillsetsEpic, loadSkillsetsEpic, addSkillsetsEpic, removeSkillsetsEpic, editSkillsetsEpic)
