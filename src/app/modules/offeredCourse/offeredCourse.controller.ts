import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { OfferedCourseServices } from './offeredCourse.service';
import sendResponse from '../../utils/sendResponse';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result =
    await OfferedCourseServices.createOfferedCourseIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course created succesfully',
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result =
    await OfferedCourseServices.getAllOfferedCoursesFromDB(
      req.query,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered-course is retrived succesfully',
    data: result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result =
    await OfferedCourseServices.getSingleOfferedCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered-course is retrived succesfully',
    data: result,
  });
});


const updateOfferedCourse = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result =
    await OfferedCourseServices.updateOfferedCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered-course is updated succesfully',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  getSingleOfferedCourse,
  getAllOfferedCourse,
  updateOfferedCourse
};
