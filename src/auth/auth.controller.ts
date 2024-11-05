import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import {
  LoginSuccessResponse,
  RegisterEmailExistsResponse,
  RegisterSuccessResponse,
} from './responses';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import LoginDto from './dto/login.dto';
import { SuccessResponse, UnauthorizedResponse } from 'src/app.response';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({
    description: 'success',
    type: RegisterDto,
  })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: RegisterSuccessResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'error: email is exists',
    type: RegisterEmailExistsResponse,
  })
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const user = await this.authService.register(registerDto);
    if (!user) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Email already exists',
      });
    }

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiBody({
    description: 'success',
    type: LoginDto,
  })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: LoginSuccessResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: UnauthorizedResponse,
  })
  login(@Request() req) {
    return {
      success: true,
      message: 'Login success',
      data: req.user,
    };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'success',
    type: RegisterSuccessResponse,
  })
  async detail(@Request() req) {
    return {
      success: true,
      message: 'Get current user',
      data: req.user,
    };
  }

  @Delete('reset')
  @ApiResponse({
    status: 200,
    description: 'success',
    type: SuccessResponse,
  })
  async reset() {
    await this.authService.reset();
    return {
      success: true,
      message: 'Reset users successfully',
      data: null,
    };
  }
}
