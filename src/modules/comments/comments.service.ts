import { Injectable, NotFoundException } from '@nestjs/common'
import { RequestContextService } from 'src/common/modules/RequestContext/request-context.service'
import { PrismaService } from 'src/prisma.service'
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
  private userId: string
  constructor(
    private readonly prisma: PrismaService,
    private readonly RequestContext: RequestContextService,
  ) {
    this.userId = RequestContext.getUserId()
  }

  findAllByTask(taskId: string) {
    return this.prisma.comment.findMany({
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
    return this.prisma.comment.create({
      data: {
        ...data,
        taskId,
        authorId: this.userId,
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
    const existingComment = await this.prisma.comment.findFirst({
      where: {
        id,
        taskId,
        authorId: this.userId,
      },
    })

    if (!existingComment) throw new NotFoundException('Comment not found')

    return this.prisma.comment.update({
      where: {
        id,
        authorId: this.userId,
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
    const existingComment = await this.prisma.comment.findFirst({
      where: {
        id,
        taskId,
        authorId: this.userId,
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
