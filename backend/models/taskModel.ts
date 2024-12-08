import mongoose, { Schema, Document } from 'mongoose';
import { ITask } from '../utils/type';

const TaskSchema: Schema = new Schema(
    {
        userId:
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        taskName:
        {
            type: String,
            required: true
        },
        description:
        {
            type: String,
            required: true
        },
        isCompleted:
        {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
