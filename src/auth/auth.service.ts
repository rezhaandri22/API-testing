import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import RegisterDto from './dto/register.dto';
import IUser from './interfaces/user.interface';
import LoginDto from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  private users: IUser[] = [];

  private getNewId() {
    const userLength = this.users.length;
    return this.users[userLength - 1]?.id + 1 || 1;
  }

  async register(registerDto: RegisterDto) {
    const isExists = this.users.find(
      (user) => user.email === registerDto.email,
    );
    if (isExists) {
      return false;
    }

    const user: IUser = {
      ...registerDto,
      id: this.getNewId(),
      password: await bcrypt.hash(registerDto.password, saltRounds),
      role: 'member',
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);
    return {
      ...user,
      password: undefined,
    };
  }

  async login(loginDto: LoginDto) {
    const user = this.users.find((user) => user.email === loginDto.email);
    if (!user) {
      return false;
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return false;
    }

    return {
      ...user,
      password: undefined,
    };
  }

  generateToken(user: IUser) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  findOne(id: number) {
    const user: IUser = this.users.find((user) => user.id === id);
    if (!user) {
      return false;
    }

    return { ...user, password: undefined };
  }

  reset() {
    this.users = [];
  }
}
