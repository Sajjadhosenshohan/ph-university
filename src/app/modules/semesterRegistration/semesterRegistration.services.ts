import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemseter;

  // check if there any registered semester that is already 'UPCOMING' OR 'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [
      {status: 'UPCOMING'},
      {status:'ONGOING'}
    ]
  })
  
  if(isThereAnyUpcomingOrOngoingSemester){
    throw new AppError(httpStatus.BAD_REQUEST, `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} registered semester !`)
  }
  // check if the semester is exist
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found !',
    );
  }

  // check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered !',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemseter'),
    query
  ).filter().sort().paginate().fields()

  const result = await semesterRegistrationQuery.modelQuery

  return result
};

const getSingleSemesterRegistrationFromDB = async (id:string) => {
  const result = await SemesterRegistration.findById(id)
  return result;
};

const updateSemesterRegistrationIntoDB = async (id:string, payload: Partial<TSemesterRegistration>) => {

  // check if the semester is exist or not
  const currentSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!currentSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This semester is not found !',
    );
  }
  // if the requested semester registration is ended , we will not update anything
  if(currentSemesterRegistrationExists?.status === 'ENDED'){
    throw new AppError(httpStatus.BAD_REQUEST, 'This semester is already ENDED')
  }

};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
