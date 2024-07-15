const express = require('express');
const router = express.Router();
const userController = require('./controllers/user-controller')

// router.get('/', (req, res) => {
//     res.json({ message: 'Hello, World!' });
// });

router.post("/signup", userController.addNewUser);
router.post("/login", userController.loginUser);
router.post("/googlelogin", userController.googleloginUser);

router.post("/:userId/mental-health-questionnaire", userController.addMentalHealthQuestionnaire);
router.put("/:userId/mental-health-questionnaire", userController.updateMentalHealthQuestionnaire);
module.exports = router;
