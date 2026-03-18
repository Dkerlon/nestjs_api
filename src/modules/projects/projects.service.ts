import { Injectable } from '@nestjs/common'
import { RequestContextService } from 'src/common/modules/RequestContext/request-context.service'
import { PrismaService } from 'src/prisma.service'
import { ProjectsRequestDTO } from './projects.dto'

@Injectable()
export class ProjectsService {
  private userId!: string
  constructor(
    private readonly prismaService: PrismaService,
    private readonly RequestContext: RequestContextService,
  ) {
    this.userId = this.RequestContext.getUserId()
  }
  findAll() {
    return this.prismaService.project.findMany({
      where: {
        createdById: this.userId,
      },
    })
  }

  findById(id: string) {
    return this.prismaService.project.findFirst({
      where: {
        id,
        createdById: this.userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        tasks: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            priority: true,
          },
        },
      },
    })
  }

  create(data: ProjectsRequestDTO) {
    return this.prismaService.project.create({
      data: {
        ...data,
        createdById: this.userId,
      },
    })
  }

  update(id: string, data: ProjectsRequestDTO) {
    return this.prismaService.project.update({
      where: {
        id,
        createdById: this.userId,
      },
      data,
    })
  }

  remove(id: string) {
    return this.prismaService.project.delete({
      where: {
        id,
        createdById: this.userId,
      },
    })
  }
}
