const uuidv4 = require('uuid/v4')


module.exports = app => {
    const userDB = app.data.user;
    const controller = {};

    const {
      user: userMock,
    } = userDB;
  
    //Users show
    controller.showUserController = (req, res) => res.status(200).json(userDB);
  
    //User create
    controller.saveUserController = (req, res) => {
      userMock.data.push({
        id: uuidv4(),
        parentId: uuidv4(),
        name: req.body.name,
        birthDate: req.body.birthDate,
        cellphone: req.body.cellphone,
        phone: req.body.phone,
        email: req.body.email,
        occupation: req.body.occupation,
        state: req.body.state,
      })

      res.status(201).json({
        message: 'User updated at successfully!',
        success: true,
        user: userMock,
      })
    }

    //User update
    controller.updateUserController = (req, res) => {
      const {
        userId
      } = req.params

      const foundUserIndex = userMock.data.findIndex(user => user.id === userId) 
      
      if(foundUserIndex === -1){
        res.status(404).json({
          message: 'Not found',
          success: false,
          user: userMock,
        })
      } else{
        const newUser = {
          id: uuidv4(),
        parentId: uuidv4(),
        name: req.body.name,
        birthDate: req.body.birthDate,
        cellphone: req.body.cellphone,
        phone: req.body.phone,
        email: req.body.email,
        occupation: req.body.occupation,
        state: req.body.state,
        createdAt: new Date()
        }
        userMock.data.splice(foundUserIndex, 1, newUser)

        res.status(200).json({
          message: 'Client found and updated at successfully!',
          success: true,
          user: userMock,
        })
      }
    }
    controller.destroyUserController = (req, res) => {
      const {
        userId
      } = req.params

      const foundUserIndex = userMock.data.findIndex(user => user.id === userId) 

      if (foundUserIndex === -1){
        res.status(404).json({
          message: 'User not found',
          success: false,
          user: userMock,
        })
      } else{
        userMock.data.splice(foundUserIndex, 1)
        res.status(200).json({
          message: 'User deleted at successfully',
          success: true,
          user: userMock,
        })
      }
      
    }
    return controller;
  }