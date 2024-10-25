// routes/userRoutes.ts
import { Router } from 'express';
import { validateUser } from '../middleware/validateUser';
import { upload } from '../middleware/upload';
import { addUser, loginUser, userDetails } from '../controller/userController';
import { authorizeUser } from '../middleware/authorizeUser';

const router = Router();

router.post('/signup', 
    upload.fields([
        { name: "CompanyLogoPath", maxCount: 1 }, 
        { name: "ProfilePicturePath", maxCount: 1 }
    ]), 
    validateUser, 
    addUser
);

router.post('/login', loginUser);

router.get('/userDetails', authorizeUser, userDetails);

export default router;
