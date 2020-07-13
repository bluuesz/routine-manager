import mongoose from 'mongoose';

export interface ITask extends mongoose.Document {
  author: string;
  title: string;
  description: string;
  date: Date;
}

const TaskSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>('Task', TaskSchema);
