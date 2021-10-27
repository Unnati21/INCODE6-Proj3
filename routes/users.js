const express = require('express')
const router = express.Router()
const db = require('../database')

//Create the first routes to return all the informatin(GET USERS)
router.get('/',(req, res) => {
    db.any('SELECT * FROM users;')
    .then((users) => {
      console.log(users)
      
      res.render('pages/users', {
        name:users.firstname + users.lastname,
        users
      })
  
    })
    .catch((error) => {
      console.log(error)
      res.redirect('/error?message=' + error.message)
    })
   
  })
  router.get('/new', (req, res) =>{
    res.render('pages/new-schedules')
  
  })
//create parameterized routes(get individual users)
  router.get('/:id', (req, res) =>{
    //TODO: Validate req.params.id
    // const user = data.users[Number(req.params.id)]
    
 
    db.any('SELECT * FROM users WHERE id = $1', [Number(req.params.id)+1])
    
    .then((users) => {
      console.log(users)
      res.render('pages/user',{
        id : (users.length)-1,
        users
      })
      
    })
    .catch((error) => {
      console.log(error)
      res.redirect('/error?message=' + error.message)
    })
    
  })
  //Create routes to update (Create new user)
  router.post('/users',(req, res) => {
    const {firstname,lastname,email,password} = req.body
    // USing bcryptsjs
     
     const salt = bcrypt.genSaltSync(10)
     const hash = bcrypt.hashSync(password, salt)
     req.body.password = hash
  
     db.none('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);', [firstname, lastname, email, hash])
    .then(() => {
      res.redirect('/users?message=Post+successfully+added')
    })
    .catch((error) => {
      console.log(error)
      res.redirect('/error?message=' + error.message)
    })
    
  })
module.exports = router