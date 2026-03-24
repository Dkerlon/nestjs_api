import { Injectable } from '@nestjs/common'
import { queryPaginationDTO } from 'src/common/dtos/query-pagination.dto'
import { PrismaService } from 'src/prisma.service'
import { paginate, paginateOutput } from 'src/utils/pagination.utils'
import { TaskDTO } from './tasks.dto'

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByProject(projectId: string, query?: queryPaginationDTO) {
    const tasks = await this.prisma.task.findMany({
      ...paginate(query),
      where: {
        projectId,
      },
    })

    const total = await this.prisma.task.count({
      where: {
        projectId,
      },
    })

    return paginateOutput(tasks, query, total)
  }

  findById(projectId: string, taskId: string) {
    return this.prisma.task.findFirst({
      where: {
        id: taskId,
        projectId,
      },
    })
  }

  create(projectId: string, data: TaskDTO) {
    return this.prisma.task.create({
      data: {
        ...data,
        projectId,
      },
    })
  }

  update(projectId: string, taskId: string, data: TaskDTO) {
    return this.prisma.task.update({
      where: {
        id: taskId,
        projectId,
      },
      data,
    })
  }

  async delete(projectId: string, taskId: string) {
    await this.prisma.task.delete({
      where: {
        id: taskId,
        projectId,
      },
    })
  }
}
