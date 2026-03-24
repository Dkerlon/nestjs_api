import { Injectable, NotFoundException } from '@nestjs/common'
import { queryPaginationDTO } from 'src/common/dtos/query-pagination.dto'
import { RequestContextService } from 'src/common/modules/RequestContext/request-context.service'
import { PrismaService } from 'src/prisma.service'
import { paginate, paginateOutput } from 'src/utils/pagination.utils'
import { CommentRequestDTO } from './comments.dto'

const authorFields = {
  name: true,
  email: true,
  id: true,
  avatar: true,
  role: true,
}
@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly RequestContext: RequestContextService,
  ) {}

  async findAllByTask(taskId: string, query?: queryPaginationDTO) {
    const comments = await this.prisma.comment.findMany({
      ...paginate(query),
      where: {
        taskId: taskId,
      },
      include: {
        author: {
          select: {
            ...authorFields,
          },
        },
      },
    })

    const total = await this.prisma.comment.count({
      where: {
        taskId: taskId,
      },
    })

    return paginateOutput(comments, query, total)
  }

  findByid(id: string, taskId: string) {
    return this.prisma.comment.findUnique({
      where: {
        id,
        taskId,
      },
      include: {
        author: {
          select: {
            ...authorFields,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
            projectId: true,
          },
        },
      },
    })
  }

  create(taskId: string, data: CommentRequestDTO) {
    const userId = this.RequestContext.getUserId()
    return this.prisma.comment.create({
      data: {
        ...data,
        taskId,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            ...authorFields,
          },
        },
      },
    })
  }

  async update(taskId: string, id: string, data: CommentRequestDTO) {
    const userId = this.RequestContext.getUserId()

    const existingComment = await this.prisma.comment.findFirst({
      where: {
        id,
        taskId,
        authorId: userId,
      },
    })

    if (!existingComment) throw new NotFoundException('Comment not found')

    return this.prisma.comment.update({
      where: {
        id,
        authorId: userId,
      },
      data,
      include: {
        author: {
          select: {
            ...authorFields,
          },
        },
      },
    })
  }

  async delete(taskId: string, id: string) {
    const userId = this.RequestContext.getUserId()

    const existingComment = await this.prisma.comment.findFirst({
      where: {
        id,
        taskId,
        authorId: userId,
      },
    })

    if (!existingComment) throw new NotFoundException('Comment not found')

    this.prisma.comment.delete({
      where: {
        id,
        taskId,
      },
    })
  }
}
