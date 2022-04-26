const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const SkillsSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },

    setType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SkillSets',
      autopopulate: true,
    },
    level: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

SkillsSchema.plugin(mongoosePaginate)
SkillsSchema.index({
  title: 'text',
  setType: 'text',
  level: 'text',
})

const myModel = (module.exports = mongoose.model('Skills', SkillsSchema, 'skills'))
myModel.schema = SkillsSchema
