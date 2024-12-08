import { Request, Response } from 'express';
import Task from '../models/taskModel';

export async function addTask(req: Request, res: Response) {
    try {
        const { userId, taskName, description, isCompleted } = req.body;
        console.log(userId);

        if (!userId || !taskName || !description) {
            return res.status(400).json({ message: 'Missing required fields: userId, taskName, or description.' });
        }

        const newTask = new Task({
            userId,
            taskName,
            description,
            isCompleted: isCompleted || false,
        });

        const savedTask = await newTask.save();

        return res.status(201).json({ message: 'Task added successfully.', task: savedTask });
    } catch (error) {
        console.error('Error adding task:', error);
        return res.status(500).json({ message: 'An error occurred while adding the task.', error });
    }
}

export async function editTask(req: Request, res: Response) {
    try {
        const { userId, taskName, description, isCompleted } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'userId is required.' });
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id:userId },
            { taskName, description, isCompleted },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        return res.status(200).json({
            message: 'Task updated successfully.',
            task: updatedTask,
        });
    } catch (error) {
        console.error('Error editing task:', error);
        return res.status(500).json({ message: 'An error occurred while editing the task.', error });
    }
}

export async function deleteTask(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Task ID is required.' });
        }

        const deletedTask = await Task.findOneAndDelete({ _id: id });


        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        return res.status(200).json({
            message: 'Task deleted successfully.',
            task: deletedTask,
        });

    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ message: 'An error occurred while deleting the task.', error });
    }
}

export async function isCompleted(req: Request, res: Response) {
    try {
        const { id } = req.params;
        console.log(typeof (id));

        if (!id) {
            return res.status(400).json({ message: 'Task ID is required.' });
        }
        const task = await Task.findOne({ _id: id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        task.isCompleted = !task.isCompleted;

        const updatedTask = await task.save();

        return res.status(200).json({
            message: 'Task isCompleted status toggled successfully.',
            task: updatedTask,
        });
    } catch (error) {
        console.error('Error toggling isCompleted:', error);
        return res.status(500).json({ message: 'An error occurred while toggling the task status.', error });
    }
}

export async function getTasks(req: Request, res: Response) {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const tasks = await Task.find({ userId: id }).sort({ createdAt: -1 });

        if (!tasks || tasks.length === 0) {
            return res.status(200).json({ message: "No tasks found for the user.", isData: false });
        }

        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "An error occurred while fetching tasks." });
    }
}

