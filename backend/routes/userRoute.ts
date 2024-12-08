import express from 'express';
import { logout, userLogin, userSignup } from '../controllers/userControl';
import { addTask, deleteTask, editTask, getTasks, isCompleted } from '../controllers/taskController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRoute = express.Router();


userRoute.post('/signup', async (req, res) => {
    await userSignup(req, res);
});

userRoute.post('/login', async (req, res) => {
    await userLogin(req, res);
});

//Task Route with protected
userRoute.post('/addTask', authMiddleware, async (req, res) => {
    await addTask(req, res);
});

userRoute.put('/editTask', authMiddleware, async (req, res) => {
    await editTask(req, res);
});

userRoute.delete("/deleteTask/:id", authMiddleware, async (req, res) => {
    await deleteTask(req, res);
});

userRoute.patch("/isCompleted/:id", authMiddleware, async (req, res) => {
    await isCompleted(req, res);
});

userRoute.get("/getTasks/:id", authMiddleware, async (req, res) => {
    await getTasks(req, res);
});

userRoute.get("/logout", authMiddleware, async (req, res) => {
    await logout(req, res);
});


export default userRoute;
