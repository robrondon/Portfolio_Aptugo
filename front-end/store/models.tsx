export interface IProjectsItem {
  _id?: String
  createdAt: Date

  title: string

  image: string

  githubLink: string

  liveLink: string
}

export interface IpaginatedProjects {
  docs: IProjectsItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface ISkillsItem {
  _id?: String
  createdAt: Date

  title: string
  setType: ISkillsetsItem

  level: string
}

export interface IpaginatedSkills {
  docs: ISkillsItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface ISkillsetsItem {
  _id?: String
  createdAt: Date

  set: string
  // SkillSets - Skills - setType - SkillSets - set
  Skills: ISkillsItem[]
}

export interface IpaginatedSkillsets {
  docs: ISkillsetsItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
