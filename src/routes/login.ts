// Login 
import express from 'express'
import sessions from 'express-session';
import { getConnection } from 'typeorm';
import { User } from '../models/User';

import * as bycrpt from 'bcryptjs'


const router: express.Router = express.Router()



router.get('/', (req, res)=>{
    if(req.session?.user){
        console.debug(req.session?.user)
        res.redirect('/dashboard')
        console.log('Redirected')
        return
    }
    res.render('index')
})


router.post('/login',async (req, res) => {
    let user: User | any = undefined

    console.log(`[DEBUG] Session ` + req.session?.user  )



    if(req?.session?.user){
        res.redirect('/dashboard')
        return
    }
    try{
        user = await find_user(req.body.username, req.body.password)

        req.session!.user = user
        console.log(`[DEBUG] Session ` + req.session?.user )

        res.redirect('/dashboard')
    }catch(e){
        res.send(e.message)
    }


})


async function find_user(username: string, password: string){
    const repo = getConnection().getRepository(User);

    const user: User | any = await repo.findOne({
        username: username
    })


    const compare: boolean = bycrpt.compareSync(password, user.password)

    if(!compare){
        throw "username or password not found"
    }
    return user

}







export = router
