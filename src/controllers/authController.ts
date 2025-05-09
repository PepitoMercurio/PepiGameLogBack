import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const prisma = new PrismaClient();
dotenv.config();

interface User {
  id: string;
  username: string;
  email: string;
}

const GenerateWebToken = async (user: User) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
        return jwt.sign(user, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Erreur lors de la génération du jeton d\'authentification :', error);
        throw error;
    }   
}

const authController = {
  register : async (req: Request, res: Response) => {
    const data = req.body;

    try {
      const findUser = await prisma.users.findUnique({
        where: { email: data.email },
      });

      if (findUser) {
        return res.status(401).json({ message: 'Email already used' });
      }

      if (data.provider === "google" && data.provider_id) {

        const user = await prisma.users.create({
          data: data
        });

      } else if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
    
        const newData = {
          ...data,
          password: hashedPassword
        }
        
        const user = await prisma.users.create({
          data: newData
        });
      } else {
        return res.status(401).json({ message: 'Failed' });
      }

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Connexion locale avec mot de passe
    if (user.provider === "local") {
      if (user.password && data.password) {

        const validPassword = await bcrypt.compare(data.password, user.password);
        if (validPassword) {

          const userForToken = {
            id: user.id.toString(),
            username: user.username,
            email: user.email
          }

          const token = await GenerateWebToken(userForToken)

          return res.status(200).json({
            message: 'Login successful',
            token: token,
          });

        } else {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        return res.status(400).json({ message: 'Password required' });
      }
    }

    // Connexion via Google ou autre provider
    if (user.provider !== "local") {
      if (user.provider_id && user.provider_id === data.provider_id) {

        const userForToken = {
            id: user.id.toString(),
            username: user.username,
            email: user.email
          }

        const token = await GenerateWebToken(userForToken)

        return res.status(200).json({
          message: 'Login successful',
          token: token,
        });
      } else {
        return res.status(401).json({ message: 'Invalid provider ID' });
      }
    }

    return res.status(401).json({ message: 'Login failed' });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

}


export default authController;
