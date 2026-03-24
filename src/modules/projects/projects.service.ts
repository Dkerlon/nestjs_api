import { Injectable } from '@nestjs/common'
import { Project } from '@prisma/client'
import { queryPaginationDTO } from 'src/common/dtos/query-pagination.dto'
import { RequestContextService } from 'src/common/modules/RequestContext/request-context.service'
import { PrismaService } from 'src/prisma.service'
import { paginate, paginateOutput } from 'src/utils/pagination.utils'
import { ProjectsRequestDTO } from './projects.dto'

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly RequestContext: RequestContextService,
  ) {
  }
  async findAll(query?: queryPaginationDTO) {
    const userId = this.RequestContext.getUserId();
    const projects = await this.prismaService.project.findMany({
      ...paginate(query),
      where: {
        createdById: userId,
      },
    })

    const total = await this.prismaService.project.count({
      where: {
        OR: [
          { createdById: userId },
          {
            collaborators: {
              some: { userId: userId },
            },
          },
        ],
      },
    })

    return paginateOutput<Project>(projects, query, total)
  }

  findById(id: string) {
    const userId = this.RequestContext.getUserId();
    return this.prismaService.project.findFirst({
      where: {
        id,
        createdById: userId,
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
    const userId = this.RequestContext.getUserId();
    return this.prismaService.project.create({
      data: {
        ...data,
        createdById: userId,
      },
    })
  }

  update(id: string, data: ProjectsRequestDTO) {
    const userId = this.RequestContext.getUserId();
    return this.prismaService.project.update({
      where: {
        id,
        createdById: userId,
      },
      data,
    })
  }

  remove(id: string) {
    const userId = this.RequestContext.getUserId();
    return this.prismaService.project.delete({
      where: {
        id,
        createdById: userId,
      },
    })
  }
}
