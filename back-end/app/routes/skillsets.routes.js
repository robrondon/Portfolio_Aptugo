module.exports = (app) => {
  const skillsets = require('../controllers/skillsets.controller.js')

  // Get all records
  app.get('/api/skillsets', (req, res) => {
    skillsets.findAll({ req, res })
  })

  // Search records
  app.get('/api/skillsets/search', (req, res) => {
    skillsets.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/skillsets/:ID', (req, res) => {
    skillsets.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/skillsets', (req, res) => {
    skillsets
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/skillsets/:ID', (req, res) => {
    skillsets
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/skillsets/:ID', (req, res) => {
    skillsets
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
