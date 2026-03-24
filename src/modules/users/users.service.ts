import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService){}

  findAll(){
    return this.prisma.user.findMany({
      select:{
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  findById(id: string){
    return this.prisma.user.findUnique({
      where: {
        id
      },
      select:{
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        password: false,
        createdAt: true,
        updatedAt: true,
        createdProjects:{
          select:{
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          }
        }
      }
    });
  }

  findByEmail(email: string){
    return this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }


  create(data: CreateUserDTO){
    return this.prisma.user.create({
      data,
      select:{
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  update(id: string, data: UpdateUserDTO){
    return this.prisma.user.update({
      where: {
        id
      },
      data,
      select:{
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        password: false,
        createdAt: true,
        updatedAt: true,
        createdProjects:{
          select:{
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          }
        }
      }
    });
  }

  async delete(id: string){
    return await this.prisma.user.delete({
      where: {
        id
      }
    });
  }
}
