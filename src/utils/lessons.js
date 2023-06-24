const LessonSchedule = require("../database/schemas/LessonSchedule");
const { compareHours } = require("./date");

const getCurrentLessons = async (userId, teacher) => {
  try {
    const schedule = await LessonSchedule.find(
      teacher
        ? {
            teachers: { $in: [userId] },
          }
        : {
            students: { $in: [userId] },
          }
    ).exec();
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentTime = currentDate.toLocaleTimeString();

    let todaySchedule = undefined;

    switch (currentDay) {
      case 0:
        // sunday
        todaySchedule = schedule[0].sunday;
        break;
      case 1:
        // monday
        todaySchedule = schedule[0].monday;
        break;
      case 2:
        // tuesday
        todaySchedule = schedule[0].tuesday;
        break;
      case 3:
        // wednesday
        todaySchedule = schedule[0].wednesday;
        break;
      case 4:
        // thursday
        todaySchedule = schedule[0].thursday;
        break;
      case 5:
        // friday
        todaySchedule = schedule[0].friday;
        break;
      case 6:
        // saturday
        todaySchedule = schedule[0].saturday;
        break;
      default:
        break;
    }

    return todaySchedule.filter(
      (lesson) =>
        (compareHours(currentTime, lesson.startTime) === 1 ||
          compareHours(currentTime, lesson.startTime) === 0) &&
        compareHours(currentTime, lesson.endTime) === -1
    );
  } catch (error) {
    return [];
  }
};

module.exports = { getCurrentLessons };
