import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(
    OfferedCourseValidation.createOfferedCourseValidationSchema,
  ),
  OfferedCourseController.createOfferedCourse,
);

router.get('/:id', OfferedCourseController.getAllOfferedCourse);

router.get('/', OfferedCourseController.getSingleOfferedCourse);

router.patch(
  '/:id',
  validateRequest(
    OfferedCourseValidation.updateOfferedCourseValidationSchema
  ),
  OfferedCourseController.updateOfferedCourse,
);


export const OfferedCourseRoutes = router;
