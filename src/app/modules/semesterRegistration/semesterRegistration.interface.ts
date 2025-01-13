import { Types } from "mongoose"

export type TSemesterRegistration = {
    academicSemseter: Types.ObjectId;
    status: "UPCOMING" | "ONGOING" | "ENDED";
    startDate: Date;
    endDate: Date;
    minCredit: number;
    maxCredit: number
}