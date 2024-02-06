// __tests__/userService.test.ts
import UserService from '../services/users.service';
import HttpException from '../../shared/utils/exceptions/http.exceptions';
import MockUserRepo from './__mocks__/userRepo';
import bcrypt from '../utils/bcrypt';
import { IUser } from '../types/user.types';
import pubSub from '../subscribers/users';

jest.mock('../dataAccess');

jest.mock('../utils/bcrypt', () => ({
  generateSalt: jest.fn(),
  hashPassword: jest.fn(),
}));

// At the top of your test file
jest.mock('../subscribers/users', () => ({
  emit: jest.fn(),
}));

interface UserServiceWithMock {
  userRepo: MockUserRepo; // Add any other properties/methods if needed
}

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should sign up a user successfully', async () => {
      // Mock findOne to return null, simulating no user found
      jest.spyOn(MockUserRepo.prototype, 'findOne').mockResolvedValue(null);

      // Mock bcrypt functions
      jest.spyOn(bcrypt, 'generateSalt').mockResolvedValue('mockedSalt');
      jest.spyOn(bcrypt, 'hashPassword').mockResolvedValue('hashedPassword');

      const userServiceWithMock: UserServiceWithMock = {
        userRepo: new MockUserRepo(),
      };

      const mockUser = {
        title: 'Mr',
        firstName: 'Joshua',
        lastName: 'Ajagbe',
        email: 'joshuaajagbe96@gmail.com',
        phone: '08135860429',
        password: 'testing',
        dateOfBirth: '1996-08-26',
        address: '123 Main St, City',
        role: 'user',
        nationality: 'US',
        username: 'johndoe',
        gender: 'male',
        profilePicture: 'https://example.com/profile.jpg',
      };

      const result = await UserService.signUp.call(
        userServiceWithMock,
        <IUser>mockUser
      );

      expect(result.data.firstName).toBe('Joshua');
      expect(result.data.lastName).toBe('Ajagbe');
      expect(result.data.email).toBe('joshuaajagbe96@gmail.com');
      expect(result.data.phone).toBe('08135860429');
      expect(bcrypt.generateSalt).toHaveBeenCalledWith(expect.any(Number));
      expect(bcrypt.hashPassword).toHaveBeenCalledWith('testing', 'mockedSalt');
      expect(result.status).toBe('success');
      expect(result.statusCode).toBe(200);
      // ... inside your test

      // Check if pubSub.emit was called
      expect(pubSub.emit).toHaveBeenCalledWith(
        'user_created',
        expect.any(String)
      );
    });

    it('should return an error if user already exists', async () => {
      // Mock findOne to return a user, simulating user already exists
      const foundUser = {
        title: 'Mr',
        firstName: 'Joshua',
        lastName: 'Ajagbe',
        email: 'joshuaajagbe96@gmail.com',
        phone: '08135860429',
        password: 'testing',
        dateOfBirth: '1996-08-26',
        address: '123 Main St, City',
        role: 'user',
        nationality: 'US',
        username: 'johndoe',
        gender: 'male',
        profilePicture: 'https://example.com/profile.jpg',
      };
      jest
        .spyOn(MockUserRepo.prototype, 'findOne')
        .mockResolvedValue(<IUser>foundUser);

      const userServiceWithMock: UserServiceWithMock = {
        userRepo: new MockUserRepo(),
      };

      const mockUser = {
        title: 'Mr',
        firstName: 'Joshua',
        lastName: 'Ajagbe',
        email: 'joshuaajagbe96@gmail.com',
        phone: '08135860429',
        password: 'testing',
        dateOfBirth: '1996-08-26',
        address: '123 Main St, City',
        role: 'user',
        nationality: 'US',
        username: 'johndoe',
        gender: 'male',
        profilePicture: 'https://example.com/profile.jpg',
      };

      const result = await UserService.signUp.call(
        userServiceWithMock,
        <IUser>mockUser
      );
      expect(result).toHaveProperty('status', 'failure');
      expect(result).toHaveProperty('message', 'Phone or Email already exists');
    });
  });
});
