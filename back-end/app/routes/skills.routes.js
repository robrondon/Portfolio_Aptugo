module.exports = (app) => {
  const skills = require('../controllers/skills.controller.js')

  // Get all records
  app.get('/api/skills', (req, res) => {
    skills.findAll({ req, res })
  })

  // Search records
  app.get('/api/skills/search', (req, res) => {
    skills.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/skills/:ID', (req, res) => {
    skills.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/skills', (req, res) => {
    skills
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/skills/:ID', (req, res) => {
    skills
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/skills/:ID', (req, res) => {
    skills
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
