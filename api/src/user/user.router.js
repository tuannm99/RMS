const express = require('express');

// const { checkAuth } = require('../core/global.middleware');
// const { ROLES } = require('../constants');
const userController = require('./user.controller');

// router
const router = express.Router();

router.get(
  '/',
  // checkAuth(ROLES.admin),
  userController.getAllUsersHandler
);
router.get(
  '/:id',
  // checkAuth(ROLES.admin, ROLES.employee),
  userController.getUserHandler
);

router.put(
  '/:id',
  // checkAuth(ROLES.admin, ROLES.employee),
  userController.updateUserHandler
);

router.delete(
  '/:id',
  // checkAuth(ROLES.admin, ROLES.employee),
  userController.deleteUserHandler
);

// router.get('/users', checkAuth(ROLES.admin, ROLES.employee), userController.getUsersHandler);

module.exports = router;
