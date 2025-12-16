import express from 'express'
import { createUser,loginUser,getUser } from '../Controller/userController.js'

const router=express.Router()

router.post('/create',createUser)
router.post('/login',loginUser)
router.get('/getdata',getUser)

export default router;