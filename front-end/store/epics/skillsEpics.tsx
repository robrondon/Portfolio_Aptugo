import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  addedSkills,
  addingSkills,
  addingSkillsFailed,
  editedSkills,
  editingSkills,
  editingSkillsFailed,
  foundSkills,
  loadedSkills,
  loadingSkills,
  loadingSkillsFailed,
  removedSkill,
  removingSkill,
  removingSkillFailed,
  searchingSkills,
  searchingSkillsFailed,
  SkillsAction,
  SkillsActionTypes,
} from '../actions/skillsActions'
import { IState } from '../reducers'
import { buildFormData } from './index'

const searchSkillsEpic: Epic<SkillsAction, SkillsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SkillsActionTypes.SEARCH_SKILLS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/skills/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundSkills(response.data, action.keep)),
        startWith(searchingSkills()),
        catchError(() => of(searchingSkillsFailed()))
      )
    })
  )

const loadSkillsEpic: Epic<SkillsAction, SkillsAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(SkillsActionTypes.LOAD_SKILLS)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/skills/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedSkills(response.data)),
        startWith(loadingSkills()),
        catchError(() => of(loadingSkillsFailed()))
      )
    })
  )
}

const addSkillsEpic: Epic<SkillsAction, SkillsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SkillsActionTypes.ADD_SKILLS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/skills/`, data, config)).pipe(
        map((response) => addedSkills(response.data)),
        startWith(addingSkills()),
        catchError((err) => of(addingSkillsFailed(err.response)))
      )
    })
  )

const removeSkillsEpic: Epic<SkillsAction, SkillsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SkillsActionTypes.REMOVE_SKILL)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/skills/${action.payload._id}`)).pipe(
        map((response) => removedSkill()),
        startWith(removingSkill()),
        catchError(() => of(removingSkillFailed()))
      )
    )
  )

const editSkillsEpic: Epic<SkillsAction, SkillsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SkillsActionTypes.EDIT_SKILLS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/skills/${action.payload._id}`, data, config)).pipe(
        map((response) => editedSkills(response.data)),
        startWith(editingSkills()),
        catchError(() => of(editingSkillsFailed()))
      )
    })
  )

export default combineEpics(searchSkillsEpic, loadSkillsEpic, addSkillsEpic, removeSkillsEpic, editSkillsEpic)
