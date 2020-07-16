// Register Route
import express from 'express'
import {getConnection, QueryFailedError} from 'typeorm';


// hash
import * as bcrypt from 'bcryptjs'


//User model
import {User} from '../models/User';

const router: express.Router = express.Router()

router.get('/', (req, res)=>{
    if(req.session?.user){
        console.debug(req.session?.user)
        res.redirect('/dashboard')
        return
    }
    res.render('register')
})
router.post('/',(req, res) => {
    registerUser(req.body).
        then(() =>{
            res.redirect('/register/ok')
        }).
        catch(e=>{
            if (!(e instanceof QueryFailedError)){
                console.error('[ERROR] /register '+e)
                res.send('Something went wrong')
                return
            }
            console.table(e)
        })
})

router.get('/ok',(req,res) =>{
    res.render('register_ok')
})

async function registerUser(body: any){

    const repo= getConnection().getRepository(User)
    const user: User = new User();

    user.firstname = body.firstname
    user.lastname = body.lastname
    user.email = body.email
    user.username = body.username
    user.password = bcrypt.hashSync(body.password ,10)

    await repo.save(user)
}




export = router

