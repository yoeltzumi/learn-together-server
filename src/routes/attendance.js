const { Router } = require("express");

const { teacherAuthorization } = require("../middlewares/authorization");
const { getCurrentLessons } = require("../utils/lessons");

const router = Router();

router.post("/open", teacherAuthorization, async (req, res) => {
  // todo continue
  const userId = req.user.userId;
  const currentLessons = await getCurrentLessons(userId, true);
  console.log(currentLessons);
  res.sendStatus(200);
});

module.exports = router;
