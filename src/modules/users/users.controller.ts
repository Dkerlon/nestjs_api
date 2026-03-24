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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { RequestContextService } from 'src/common/modules/RequestContext/request-context.service'
import { CloudinaryService } from 'src/common/services/cloudinary/cloudinary.service'
import { CreateUserDTO, UpdateUserDTO, UserFullDTO, UserListItemDTO } from './users.dto'
import { UsersService } from './users.service'

@Controller({
  version: '1',
  path: 'users',
})
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly requestContextService: RequestContextService,
  ) {}

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
  @ApiResponse({ type: UserListItemDTO })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data)
  }

  @Put(':userId')
  @ApiResponse({ type: UserListItemDTO })
  @HttpCode(HttpStatus.OK)
  update(@Param('userId', ParseUUIDPipe) userId: string, @Body() data: UpdateUserDTO) {
    const user = this.usersService.findById(userId)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return this.usersService.update(userId, data)
  }

  @Post('/avatar')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Avatar uploaded successfully',
    type: UserListItemDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    const userId = this.requestContextService.getUserId()

    const response = await this.cloudinaryService.upload(file, userId)
    const updatedUser = await this.usersService.update(userId, { avatar: response.url })

    return updatedUser
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
