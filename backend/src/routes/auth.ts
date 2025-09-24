import express, { Request, Response } from 'express';
import { User } from '@/models/User';
import { Cook } from '@/models/Cook';
import { hashPassword, generateToken } from '@/utils/auth';
import { registerSchema, RegisterInput } from '@/utils/validation';
import { AuthResponse } from '@/types';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.error.errors
      });
    }

    const { name, email, password, role, phone, neighborhood }: RegisterInput = validation.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: 'User with this email already exists'
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      language: 'ar',
      addresses: []
    });

    const savedUser = await newUser.save();

    if (role === 'cook') {
      const cookData = new Cook({
        userId: savedUser._id,
        displayName: name,
        neighborhood: neighborhood || 'Centre-ville',
        delivery: {
          enabled: true,
          pickupEnabled: true
        }
      });

      await cookData.save();
    }

    const userResponse = savedUser.toJSON();
    const token = generateToken(userResponse);

    const response: AuthResponse = {
      user: userResponse,
      token
    };

    res.status(201).json(response);

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Internal server error during registration'
    });
  }
});

export { router as authRouter };