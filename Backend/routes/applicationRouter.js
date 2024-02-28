import express from 'express';
import { employerGetAllApplications, jobseekerDeleteApplication, jobseekerGetAllApplications, postApplication } from '../controllers/applicationController.js';
import { isAuthorized } from '../middlewares/auth.js';
// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// })

// const upload = multer({ storage })
const router = express.Router();

router.get('/employer/getall', isAuthorized, employerGetAllApplications);
router.get('/jobseeker/getall', isAuthorized, jobseekerGetAllApplications);
router.delete('/delete/:id', isAuthorized, jobseekerDeleteApplication);
router.post('/jobseeker/postapplication', isAuthorized, postApplication)
// router.post('/jobseeker/postapplication', isAuthorized, upload.single("resume"), postApplication)

export default router;