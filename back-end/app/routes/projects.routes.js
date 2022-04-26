module.exports = (app) => {
  const projects = require('../controllers/projects.controller.js')

  // Get all records
  app.get('/api/projects', (req, res) => {
    projects.findAll({ req, res })
  })

  // Search records
  app.get('/api/projects/search', (req, res) => {
    projects.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/projects/:ID', (req, res) => {
    projects.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/projects', (req, res) => {
    projects
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/projects/:ID', (req, res) => {
    projects
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/projects/:ID', (req, res) => {
    projects
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
