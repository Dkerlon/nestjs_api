import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { SignInDTO, SignUpDTO } from './auth.dto'
import { AuthService } from './auth.service'
import { ApiOkResponse } from '@nestjs/swagger'

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
}
