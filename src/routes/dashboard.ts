
// Dashboard
import express from 'express'
import sessions from 'express-session';

import {getRepository, createQueryBuilder} from 'typeorm' 
import {Device} from './../models/Device'

const router: express.Router = express.Router()



router.get('/', (req, res)=>{
    if(!req.session?.user ){
        res.redirect('/')
        return
    }

    console.table(req.session?.user)
    const user = req.session?.user

    res.render('dashboard', {user: user})
})

router.post('/add_device', async (req, res)=>{

    const repo  = await getRepository(Device)

    // const device = await repo.findOne({
    //     hardware_id: req.body.value
    // })

    const device: Device| any = await repo.createQueryBuilder('device').
        leftJoinAndSelect('device.user', 'user').
        where('hardware_id = :id', {id: req.body.value}).
        getOne()

    console.log('[DEBUG] Add Device ' , req.body.value)
    console.log('[DEBUG] Device info')
    console.table(device)

    if(!device){
        res.send({response: 'error', message: 'Cannot find the device'})
    }

    if(!device.user == null){
        res.send({response: 'error', message: 'Device is already taken'})
    }

    
    res.send({response: 'ok', message: 'Device added'})

})




export = router
