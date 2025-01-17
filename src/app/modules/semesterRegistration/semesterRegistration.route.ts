import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get('/:id', SemesterRegistrationController.getSingleSemesterRegistration);

router.get('/', SemesterRegistrationController.getAllSemesterRegistration);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);


export const SemesterRegistrationRoutes = router;
