const express = require('express')
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
const ejs = require('ejs')

//const data =  require('./data')
const homeRouter = require('./routes/home')
const schedulesRouter = require('./routes/schedules')
const usersRouter = require('./routes/users')
const errorRouter = require('./routes/error') 


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
app.use('/schedules', schedulesRouter)
app.use('/users', usersRouter)
app.use('/', homeRouter)
app.use('*', errorRouter)

//S-2-- 2 : Create the first routes to return all the informatin(GET USERS)

//s-2-- 2 : Create the first routes to return all the informatin(GET SCHEDULES)

   


// get new schedule


//S-3-- : Create parameterized routes(get individual users)
     // route parameters--req.params

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


   //TODO: Add hash to user object and then push to user array
   // data.users.push({
   // firstname : req.body.firstname,
   // lastname: req.body.lastname,
    //email: req.body.email,
    //password: hash

   // }) 

  // res.redirect('/users')
//})
 //creat to add a new schedule. It will return the newly created schdule
 
   

    /*app.get("*", (req, res) => {
      res.render('pages/error', {
        message: req.query.message || "This page cannot be found"
      })
    })*/

  
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