const express = require('express')
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
const db = require('./database')
const data =  require('./data')
const app = express()// invoke express in order to create an instance

const PORT = process.env.PORT || 3000

// JSON and form parsing middleware
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

// Loging Middleware
app.use(morgan('dev'))

//Set view engine

app.set('view engine', 'ejs')

//Set static folder
app.use(express.static('public'))


//ROUTES
//S-2- 2 : Create the first routes to return all the informatin-(WELCOME)
app.get('/', (req, res) => {
  res.render('pages/home')

})
//S-2-- 2 : Create the first routes to return all the informatin(GET USERS)
app.get('/users',(req, res) => {
  // res.send(data.users)
  res.render('pages/users', {
   users: data.users

  })

})
//s-2-- 2 : Create the first routes to return all the informatin(GET SCHEDULES)
app.get('/schedules', (req, res) => {
   // res.send(data.schedules)
   db.any('SELECT * FROM schedules;')
   .then((schedules) =>{
     console.log(schedules)
     res.render('pages/schedules',{
      schedules, 
      message: req.query.message
    })
  })
  .catch((error) => {
    console.log(error)
 
    res.redirect("/error?message=" + error.message)
  })
})
     
   

app.get('/users/new', (req, res) =>{
  res.render('pages/new-users')

})
// get new schedule
app.get('/schedules/new', (req, res) =>{
  res.render('pages/new-schedules')

})
//S-3-- : Create parameterized routes(get individual users)
     // route parameters--req.params
app.get('/users/:id', (req, res) =>{
   //TODO: Validate req.params.id
    const user = data.users[Number(req.params.id)]

   
})
//S-3--(get  URL '/users/2/schedu of all schedules for use)(use of fillter to get the particular array)
app.get('/users/:id/schedules', (req, res) => {
  const schedules = data.schedules.filter(schedule => schedule.user_id === Number(req.params.id))
   //TODO: Validate, If array has data, than send it ,otherwise ,show error
    // let isnotValid = true
  // if(isnotValid){
    // console.log(req.params.id + "It is not Valid")
     //res.send("It is not Valid")

   //}
  res.send(schedules)

})

//S-4 : Create routes to update (Create new user)
app.post('/users',(req, res) => {
  // USing bcryptsjs
   const password = req.body.password
   const salt = bcrypt.genSaltSync(10)
   const hash = bcrypt.hashSync(password, salt)

   //TODO: Add hash to user object and then push to user array
    data.users.push({
    firstname : req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hash

    }) 

   res.redirect('/users')
})
 //creat to add a new schedule. It will return the newly created schdule
 app.post('/schedules',(req, res) => {
    //TODO: Validate Data
    const {day, start_at, end_at} = req.body

     //add schedule to db
     db.none('INSERT INTO schedules (day, start_at, end_at) VALUES ($1, $2, $3);',
     [day, start_at, end_at])
     .then(() => {
        // success 
        res.redirect('/schedules?message=schedule+added')
     })
    .catch((error) => {
      console.log(error)
      
      res.redirect("/error?message=" + error.message)
    })
    })
    app.get("*", (req, res) => {
      res.render('pages/error', {
        message: req.query.message || "This page cannot be found"
      })
    })
    //data.schedules.push({
        //user_id : req.body.user_id,
        //day: req.body.day,
       // start_at: req.body.start_at,
        //end_at: req.body.end_at
    
        //}) 
    


//CRUD-            Create, Read, Update,    Delete
//HTTP METHOD      Post,   get,  put/patch, delete



app.listen(PORT, () => {
console.log(`App is listening at http://localhost:${PORT}`)

})