const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const SkillSetsSchema = mongoose.Schema(
  {
    set: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

SkillSetsSchema.virtual('Skills', {
  ref: 'Skills',
  localField: '_id',
  foreignField: 'setType',
  justOne: false,
  type: '',
})

SkillSetsSchema.plugin(mongoosePaginate)
SkillSetsSchema.index({
  set: 'text',
})

const myModel = (module.exports = mongoose.model('SkillSets', SkillSetsSchema, 'skillsets'))
myModel.schema = SkillSetsSchema
