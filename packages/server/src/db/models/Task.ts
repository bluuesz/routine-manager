import mongoose from 'mongoose';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ITask extends mongoose.Document {
  id: string;
  author: string;
  title: string;
  description: string;
  date: Date;
  complete: boolean;
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
    complete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>('Task', TaskSchema);
