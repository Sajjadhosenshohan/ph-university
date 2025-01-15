import { z } from 'zod';
import { semeseterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemseter: z.string(),
    status: z.enum([...(semeseterRegistrationStatus as [string])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemseter: z.string().optional(),
    status: z.enum([...(semeseterRegistrationStatus as [string])]).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const SemesterRegistrationValidations = {
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema
}
