import { Request, Response } from 'express';
import { createUser, User } from '../models/user';

let users: User[] = [];

export const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.status(200).json(user);
  }
};

export const createUserHandler = (req: Request, res: Response) => {
  const { username, age, hobbies } = req.body;

  if (!username || !age || !hobbies) {
    res.status(400).json({ error: 'Missing required fields' });
  } else {
    const newUser = createUser(username, age, hobbies);
    users.push(newUser);
    res.status(201).json(newUser);
  }
};


export const updateUserHandler = (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedUserData = req.body; // Assuming you send updated user data in the request body


  // Find the user by ID after confirming the format
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
  } else {
    // Update the user data
    users[userIndex] = { ...users[userIndex], ...updatedUserData };
    res.status(200).json(users[userIndex]);
  }
};

export const deleteUserHandler = (req: Request, res: Response) => {
  const userId = req.params.userId;

  
  // Find the user by ID after confirming the format
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
  } else {
    // Delete the user
    const deletedUser = users.splice(userIndex, 1);
    res.status(204).json({ message: 'User deleted successfully', deletedUser });
  }
};
