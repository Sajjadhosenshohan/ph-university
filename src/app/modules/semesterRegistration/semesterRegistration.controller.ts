import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { SemesterRegistrationServices } from './semesterRegistration.services';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration completed succesfully',
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration is retrived succesfully',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration is retrived succesfully',
    data: result,
  });
});


const updateSemesterRegistration = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration is updated succesfully',
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  getAllSemesterRegistration,
  updateSemesterRegistration
};
