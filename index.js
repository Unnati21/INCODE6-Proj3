const express = require('express')
const bcrypt = require('bcryptjs')
const data =  require('./data')
const app = express()// invoke express in order to create an instance

const PORT = process.env.PORT || 3000

// JSON and form parsing middleware
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

//ROUTES
//S-2- 2 : Create the first routes to return all the informatin-(WELCOME)
app.get('/', (req, res) => {
  res.send("Welcome to our schedule website.")

})
//S-2-- 2 : Create the first routes to return all the informatin(GET USERS)
app.get('/users',(req, res) => {
   res.send(data.users)

})
//s-2-- 2 : Create the first routes to return all the informatin(GET SCHEDULES)
app.get('/schedules', (req, res) => {
    res.send(data.schedules)
})
//S-3-- : Create parameterized routes(get individual users)
     // route parameters--req.params
app.get('/users/:id', (req, res) =>{
   //TODO: Validate req.params.id
    const user = data.users[Number(req.params.id)]
    
    res.send(user)
})
//S-3(get  URL '/users/2/schedu -t of all schedules for use)
//------------------------------//

//S-4 : Create routes to update (Create new user)
 app.post('/users',(req, res) => {
     // USing bcryptsjs
      const password = req.body.password
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      //ToDo: Add hash to user object and then push to user array
      res.send(hash)
 })
 //creat to add a new schedule. It will return the newly created schdule
 app.post('/schedules',(req, res) => {
    //TODO: Validate Data

     //add schedule to all schedules
     data.schedules.push()
    res.send(req.body)

})


//CRUD-            Create, Read, Update,    Delete
//HTTP METHOD      Post,   get,  put/patch, delete



app.listen(PORT, () => {
console.log(`App is listening at http://localhost:${PORT}`)

})