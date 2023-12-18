import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controllers/usersController';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUserHandler);
router.put('/:userId', updateUserHandler);
router.delete('/:userId', deleteUserHandler);

export default router;
