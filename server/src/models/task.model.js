import { model, Schema } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Task name is required'],
      trim: true,
      maxlength: [255, 'Task name should not exceed 255 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description should not exceed 1000 characters'],
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          if (!value) return true; // Allows null values
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Normalize to midnight
          return value >= today;
        },
        message: 'Due date cannot be in the past',
      },
    },
    completed: {
      type: Boolean,
      default: false,
      index: true, // Index for faster queries
    },
    important: {
      type: Boolean,
      default: false,
      index: true, // Index for faster queries
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Task = model('Task', taskSchema);

export default Task;
