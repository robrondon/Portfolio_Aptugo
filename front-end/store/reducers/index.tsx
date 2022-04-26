import { combineReducers } from 'redux'
import projectsReducer, { initialProjectsState, IProjectsState } from './projectsReducer'
import skillsetsReducer, { initialSkillsetsState, ISkillsetsState } from './skillsetsReducer'
import skillsReducer, { initialSkillsState, ISkillsState } from './skillsReducer'

export interface IState {
  projects: IProjectsState
  skills: ISkillsState
  skillsets: ISkillsetsState
}

export const initialState: IState = {
  projects: initialProjectsState,
  skills: initialSkillsState,
  skillsets: initialSkillsetsState,
}

export default combineReducers({
  projects: projectsReducer,
  skills: skillsReducer,
  skillsets: skillsetsReducer,
})
