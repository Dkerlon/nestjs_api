import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOkResponse } from '@nestjs/swagger'
import { type User } from '@prisma/client'
import { AuthenticatedUser } from 'src/common/decorators/authenticated-user.decorator'
import { UsersService } from '../users/users.service'
import { SignInDTO, SignUpDTO } from './auth.dto'
import { AuthService } from './auth.service'

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signin')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() data: SignInDTO) {
    return this.authService.signIn(data)
  }

  @Post('signup')
  signUp(@Body() data: SignUpDTO) {
    return this.authService.signUp(data)
  }

  @Get('protected')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  protected(@AuthenticatedUser() user: User) {
    return {
      message: 'Authetication successful',
      user: user,
    }
  }
}
