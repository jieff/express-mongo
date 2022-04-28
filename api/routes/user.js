module.exports = app => {
    const controller = app.controllers.userController;
  
    app.route('/api/v1/user')
      .get(controller.showUserController)
      .post(controller.saveUserController)
      
    app.route('/api/v1/user/:userId')
      .put(controller.updateUserController)
      .delete(controller.destroyUserController)
  }