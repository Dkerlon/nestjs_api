import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddProjectCollaboratorDTO, UpdateProjectCollaboratorDTO } from './collaborators.dto';

const userFields = {
  user:{
    select:{
      id: true,
      name: true,
      email: true,
      avatar: true
    }
  }
}
@Injectable()
export class CollaboratorsService {

  constructor(private readonly prisma: PrismaService){}

  findAllByProject(projectId: string){
    return this.prisma.projectColaborator.findMany({
      where: {
        projectId
      },
      include: {
        ...userFields
      }
    })
  }

  async create(projectId: string, data: AddProjectCollaboratorDTO){

    const user = await this.prisma.user.findUnique({
      where: {
        id: data.userId
      }
    })

    if(!user){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const userCollaborator = await this.prisma.projectColaborator.findUnique({
      where: {
        userId_projectId: {
          userId: user.id,
          projectId
        }
      }
    })

    if(userCollaborator){
      throw new HttpException('User already exists in project', HttpStatus.CONFLICT)
    }

    return this.prisma.projectColaborator.create({
      data: {
        ...data,
        userId: data.userId,
        role: data.role,
        projectId
      },
      include:{
        ...userFields
      }
    })
  }

  async update(projectId: string, userId: string, data: UpdateProjectCollaboratorDTO){
    const userCollaborator = await this.prisma.projectColaborator.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId
        }
      }
    })

    if(!userCollaborator){
      throw new HttpException('User not found in project', HttpStatus.NOT_FOUND)
    }

    return this.prisma.projectColaborator.update({
      where: {
        userId_projectId: {
          userId,
          projectId
        }
      },
      data: {
        role: data.role
      },
      include:{
        ...userFields
      }
    })
  }

  async delete(projectId: string, userId: string){
    const collaborator = await this.prisma.projectColaborator.findUnique({
      where: {
        userId_projectId:{
          userId,
          projectId
        }
      }
    })

    if(!collaborator){
      throw new HttpException('Collaborator not found in this project', HttpStatus.NOT_FOUND)
    }

    if(collaborator.role === 'OWNER'){
      throw new BadRequestException('The project owner cannot be removed from project')
    }

    return this.prisma.projectColaborator.delete({
      where: {
        userId_projectId:{
          userId,
          projectId
        }
      }
    })
  }
}
