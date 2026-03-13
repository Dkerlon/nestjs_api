import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProjectsRequestDTO } from './projects.dto'

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.project.findMany()
  }

  findById(id: string) {
    return this.prismaService.project.findFirst({
      where: {
        id,
      },
      select:{
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        tasks: {
          select:{
            id: true,
            title: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            priority: true,
          }
        }
      }
    })
  }

  create(data: ProjectsRequestDTO) {
    return this.prismaService.project.create({
      data,
    })
  }

  update(id: string, data: ProjectsRequestDTO) {
    return this.prismaService.project.update({
      where: {
        id,
      },
      data,
    })
  }

  remove(id: string) {
    return this.prismaService.project.delete({
      where: {
        id,
      }
    })
  }
}
