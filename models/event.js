const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    immutable: true,
    set: capitalize
  },
  zipcode: {
    type: String,
    required: true
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  attendees: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  price: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
})

eventSchema.statics.deactivate = function (event) {
  return this.findByIdAndUpdate(event, { active: false })
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// eventSchema.pre('save', async function(next){
//   const event = this;
//   if(event.isModified('location')) {
//     console.log('cannot change location');
//     err = new Error('Cannot change location');
//     event.location = undefined;
//     console.log(event)
//     // next(err);
//   }
//   next();
// })

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;