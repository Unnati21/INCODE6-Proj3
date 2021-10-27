const express = require('express')
const router = express.Router()
const db = require('../database')



  //s-2-- 2 : Create the first routes to return all the informatin(GET SCHEDULES)
  router.get('/', (req, res) => {
     // res.send(data.schedules)
     db.any("SELECT user_id, username, day,TO_CHAR(start_at, 'HH12:MIAM') start_at, To_CHAR(end_at, 'HH12:MIAM') end_at FROM schedules;")
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
  
  router.get('/new', (req, res) =>{
    res.render('pages/new-users')
  
  })

   //(get individual Schedule)
   router.get('/:id', (req,res) => {
    db.any("SELECT user_id, username, day, TO_CHAR(start_at, 'HH12:MIAM') start_at,  TO_CHAR(end_at, 'HH12:MIAM') AS end_at  FROM schedules WHERE user_id=$1",[Number(req.params.id)])
    .then((schedules) => {
      console.log(schedules)
      res.render('pages/schedule', {
        
        id:Number(req.params.id),
        
        schedules
      })
    })
    .catch((error) => {
      console.log(error)
      res.redirect('/error?message=' + error.message)
    })
    
        
  })


  //creat to add a new schedule. It will return the newly created schdule
  router.post('/',(req, res) => {
    //TODO: Validate Data
    const {username, day, start_at, end_at} = req.body

     //add schedule to db
     db.none('INSERT INTO schedules (username, day, start_at, end_at) VALUES ($1, $2, $3, $4);',
     [username,day, start_at, end_at])
     .then(() => {
        // success 
        res.redirect('/schedules?message=schedule+added')
     })
    .catch((error) => {
      console.log(error)
      
      res.redirect("/error?message=" + error.message)
    })
    })

module.exports = router