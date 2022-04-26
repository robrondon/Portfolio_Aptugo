const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ProjectsSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: String,
    githubLink: {
      type: String,
    },
    liveLink: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

ProjectsSchema.plugin(mongoosePaginate)
ProjectsSchema.index({
  title: 'text',
  image: 'text',
  githubLink: 'text',
  liveLink: 'text',
})

const myModel = (module.exports = mongoose.model('Projects', ProjectsSchema, 'projects'))
myModel.schema = ProjectsSchema
