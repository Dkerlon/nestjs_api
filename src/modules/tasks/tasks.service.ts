import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskDTO } from './tasks.dto'

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByProject(projectId: string) {
    return await this.prisma.task.findMany({
      where: {
        projectId,
      },
      include: {
        project: true,
      },
    })
  }

  async findById(projectId: string, taskId: string) {
    return await this.prisma.task.findFirst({
      where: {
        id: taskId,
        projectId,
      },
      include: {
        project: true,
      },
    })
  }

  async create(projectId: string, data: TaskDTO) {
    return await this.prisma.task.create({
      data: {
        ...data,
        projectId,
      },
    })
  }

  async update(projectId: string, taskId: string, data: TaskDTO) {
    return await this.prisma.task.update({
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
