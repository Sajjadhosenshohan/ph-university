import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semeseterRegistrationStatus } from "./semesterRegistration.constant";


const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
    academicSemseter:{
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "AcademicSemester"
    },
    status:{
        type: String,
        enum: semeseterRegistrationStatus,
        default: 'UPCOMING'
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    minCredit:{
        type: Number,
        default: 3
    },
    maxCredit: {
        type: Number,
        default: 9
    }
},{
    timestamps: true
})

export const SemesterRegistration = model<TSemesterRegistration>('semesterRegistration', semesterRegistrationSchema)