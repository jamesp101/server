// Dashboard
import express from 'express'
import sessions from 'express-session';


const router: express.Router = express.Router()


router.get ('/', (req, res) =>{
    if(!req.session?.user)
        res.redirect('/')

    console.table(req.session?.user)
    res.render('device')
})

export = router
