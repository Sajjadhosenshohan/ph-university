import { z } from 'zod';
import { Days } from './offeredCourse.const';

// const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const timeStringSchema = z.string().refine(function (time) {
  return timeRegex.test(time);
}, {
  message: "Invalid time format, expected 'HH:MM' in 24 hours format"
})

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    // academicSemester: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum([...Days] as [string])),

    startTime: timeStringSchema,

    endTime: timeStringSchema // HH: MM  00-23  00-59
  })
  .refine((body)=>{
    // startTime : 10:30 => 1970-01-01T10:30
    // endTime : 12:30 => 1970-01-01T12:30

    const start = new Date(`2004-10-01T${body.startTime}:00`)
    const end = new Date(`2004-10-01T${body.endTime}:00`)

    return end > start;
  },{
    message: `Start time should be before then End time`
  }),
});
const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days] as [string])),
    
    startTime: timeStringSchema,
    endTime: timeStringSchema // HH: MM  00-23  00-59
  }).refine((body)=>{
    // startTime : 10:30 => 1970-01-01T10:30
    // endTime : 12:30 => 1970-01-01T12:30

    const start = new Date(`2004-10-01T${body.startTime}:00`)
    const end = new Date(`2004-10-01T${body.endTime}:00`)

    return end > start;
  },{
    message: `Start time should be before then End time`
  }),
});

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
