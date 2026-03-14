import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskDTO } from './tasks.dto'

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  findAllByProject(projectId: string) {
    return this.prisma.task.findMany({
      where: {
        projectId,
      },
    })
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
