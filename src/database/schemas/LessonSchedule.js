const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  subject: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  startTime: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  endTime: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  activatedForAttendence: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
});

const LessonScheduleSchema = new mongoose.Schema({
  sunday: {
    type: [LessonSchema],
    required: false,
    unique: false,
    default: [],
  },
  monday: {
    type: [LessonSchema],
    required: false,
    unique: false,
    default: [],
  },
  tuesday: {
    type: [LessonSchema],
    required: false,
    unique: false,
    default: [],
  },
  wednesday: {
    type: [LessonSchema],
    required: false,
    unique: false,
    default: [],
  },
  thursday: {
    type: [LessonSchema],
    required: false,
    unique: false,
    default: [],
  },
  friday: {
    type: [LessonSchema],
    required: false,
    unique: false,
    default: [],
  },
  saturday: {
    type: [LessonSchema],
    required: false,
    unique: false,
    default: [],
  },
  students: {
    type: [mongoose.SchemaTypes.String],
    required: false,
    unique: false,
    default: [],
  },
  teachers: {
    type: [mongoose.SchemaTypes.String],
    required: false,
    unique: false,
    default: [],
  },
});

module.exports = mongoose.model("lessons", LessonScheduleSchema);
exports.Lesson = mongoose.model("lesson", LessonSchema);
