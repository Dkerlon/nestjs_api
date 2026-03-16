import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { CreateUserDTO, UpdateUserDTO, UserFullDTO, UserListItemDTO } from './users.dto'
import { UsersService } from './users.service'

@Controller({
  version: '1',
  path: 'users',
})
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ type: [UserListItemDTO] })
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':userId')
  @ApiResponse({ type: UserFullDTO })
  findById(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = this.usersService.findById(userId)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return this.usersService.findById(userId)
  }

  @Get('email/:email')
  @ApiResponse({ type: UserFullDTO })
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data)
  }

  @Put(':userId')
  update(@Param('userId', ParseUUIDPipe) userId: string, @Body() data: UpdateUserDTO) {
    const user = this.usersService.findById(userId)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return this.usersService.update(userId, data)
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = this.usersService.findById(userId)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return this.usersService.delete(userId)
  }
}
