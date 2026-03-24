import { Module } from '@nestjs/common'
import { CloudinaryService } from 'src/common/services/cloudinary/cloudinary.service'
import { PrismaService } from 'src/prisma.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, CloudinaryService],
  exports: [UsersService],
})
export class UsersModule {}
