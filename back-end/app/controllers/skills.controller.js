const Skills = require('../models/skills.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Skill
exports.create = async (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (typeof data.title !== 'undefined') updatedData['title'] = data.title

  if (data.setType === 'null') data.setType = null
  updatedData['setType'] = {}
  try {
    const SkillSets = require('../models/skillsets.model.js')
    let ReceivedsetType = typeof data.setType === 'string' ? JSON.parse(data.setType) : data.setType
    setTypeinfo = Array.isArray(ReceivedsetType) ? ReceivedsetType[0] : ReceivedsetType

    if (!setTypeinfo._id) {
      const setTypeID = require('mongoose').Types.ObjectId()
      const SkillSet = new SkillSets({ ...setTypeinfo, _id: setTypeID })
      SkillSet.save()
      updatedData['setType'] = setTypeID
    } else {
      updatedData['setType'] = setTypeinfo._id
    }
  } catch (e) {
    updatedData['setType'] = data.setType
  }

  if (typeof data.level !== 'undefined') updatedData['level'] = data.level

  // Create a Skill
  const Skill = new Skills(updatedData)

  // Save Skill in the database
  Skill.save()
    .then((data) => {
      exports.findOne({ ID: data._id, res: options.res })
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while saving the record.',
      })
    })
}

exports.createAsPromise = (options) => {
  return new Promise(async (resolve, reject) => {
    const data = options.req ? options.req.body : options.data
    const updatedData = {}
    if (data._id) updatedData._id = data._id

    if (typeof data.title !== 'undefined') updatedData['title'] = data.title

    if (data.setType === 'null') data.setType = null
    updatedData['setType'] = {}
    try {
      const SkillSets = require('../models/skillsets.model.js')
      let ReceivedsetType = typeof data.setType === 'string' ? JSON.parse(data.setType) : data.setType
      setTypeinfo = Array.isArray(ReceivedsetType) ? ReceivedsetType[0] : ReceivedsetType

      if (!setTypeinfo._id) {
        const setTypeID = require('mongoose').Types.ObjectId()
        const SkillSet = new SkillSets({ ...setTypeinfo, _id: setTypeID })
        SkillSet.save()
        updatedData['setType'] = setTypeID
      } else {
        updatedData['setType'] = setTypeinfo._id
      }
    } catch (e) {
      updatedData['setType'] = data.setType
    }

    if (typeof data.level !== 'undefined') updatedData['level'] = data.level

    // Create a Skill
    const Skill = new Skills(updatedData)

    // Save Skill in the database
    Skill.save()
      .then((result) => {
        if (options.skipfind) {
          resolve(result)
        } else {
          exports.findOne({ ID: result._id, res: options.res }).then((result) => {
            resolve(result)
          })
        }
      })
      .catch((err) => {
        reject(errors.prepareError(err))
      })
  })
}

// Retrieve and return all Skills from the database.
exports.findAll = (options) => {
  const query = options.query ? options.query : options.req.query
  if (typeof query.populate === 'undefined') query.populate = 'true'
  const data = options.req ? options.req.body : options.data
  if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

  const findString = {}
  if (query.fixedSearch) {
    query.fixedSearch = JSON.parse(query.fixedSearch)
    findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
  }

  Skills.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('SkillSets') > -1) && {
        strictPopulate: false,
        model: 'SkillSets',
        path: 'setType',
      }
    )

    .then((skills) => {
      options.res.json(paginate.paginate(skills, { page: query.page, limit: query.limit || 10 }))
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records.',
      })
    })
}

exports.find = (options) => {
  return new Promise((resolve, reject) => {
    const query = options.query ? options.query : options.req.query
    const data = options.req ? options.req.body : options.data
    let findString = query.searchString ? { $text: { $search: query.searchString } } : {}
    if (query.searchField) {
      if (Skills.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Skills.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (Skills.schema.path(query.searchField).instance === 'ObjectID' || Skills.schema.path(query.searchField).instance === 'Array') {
        findString = { [query.searchField]: require('mongoose').Types.ObjectId(query.searchString) }
      }
    } else if (query.filters) {
      query.filters.forEach((filter) => {
        const parsed = typeof filter === 'string' ? JSON.parse(filter) : filter
        findString[parsed.field] = parsed.value
      })
    }
    if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

    if (query.fixedSearch) {
      query.fixedSearch = JSON.parse(query.fixedSearch)
      findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
    }

    Skills.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('SkillSets') > -1) && {
          strictPopulate: false,
          model: 'SkillSets',
          path: 'setType',
        }
      )

      .then((skill) => {
        resolve(paginate.paginate(skill, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Skill with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Skills.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('SkillSets') > -1) && {
          strictPopulate: false,
          model: 'SkillSets',
          path: 'setType',
        }
      )

      .then((skill) => {
        if (!skill) {
          return options.res.status(404).send({
            message: 'Skill not found with id ' + id,
          })
        }
        resolve(paginate.paginate([skill]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Skill not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Skill with id ' + id,
        })
      })
  })
}

// Update a skill identified by the ID in the request
exports.update = (options) => {
  return new Promise(async (resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (typeof data.title !== 'undefined') updatedData['title'] = data.title

    if (data.setType === 'null') data.setType = null
    updatedData['setType'] = {}
    try {
      const SkillSets = require('../models/skillsets.model.js')
      let ReceivedsetType = typeof data.setType === 'string' ? JSON.parse(data.setType) : data.setType
      setTypeinfo = Array.isArray(ReceivedsetType) ? ReceivedsetType[0] : ReceivedsetType

      if (!setTypeinfo._id) {
        const setTypeID = require('mongoose').Types.ObjectId()
        const SkillSet = new SkillSets({ ...setTypeinfo, _id: setTypeID })
        SkillSet.save()
        updatedData['setType'] = setTypeID
      } else {
        updatedData['setType'] = setTypeinfo._id
      }
    } catch (e) {
      updatedData['setType'] = data.setType
    }

    if (typeof data.level !== 'undefined') updatedData['level'] = data.level

    // Find Skill and update it with the request body
    const query = { populate: 'true' }
    Skills.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('SkillSets') > -1) && {
          strictPopulate: false,
          model: 'SkillSets',
          path: 'setType',
        }
      )

      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Delete a skill with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Skills.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
