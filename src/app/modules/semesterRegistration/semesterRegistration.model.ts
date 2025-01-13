import { Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semeseterRegistrationStatus } from "./semesterREgistration.constant";


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
        
    }
})