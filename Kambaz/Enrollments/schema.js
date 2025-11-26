import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    _id: String,
    course: { type: String, ref: "CourseModel" },  // ✅ String because courses use string IDs
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },  // ✅ ObjectId because users use ObjectId
    grade: Number,
    letterGrade: String,
    enrollmentDate: Date,
    status: {
      type: String,
      enum: ["ENROLLED", "DROPPED", "COMPLETED"],
      default: "ENROLLED",
    },
  },
  { collection: "enrollments" }
);

export default enrollmentSchema;