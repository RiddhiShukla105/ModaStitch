import express from 'express'
import { userfeedback } from '../Controller/feedbackController.js'


const router=express.Router()

router.post("/feed",userfeedback)

export default router;