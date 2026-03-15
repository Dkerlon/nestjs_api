import { Injectable, NotFoundException } from '@nestjs/common'
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
  constructor(private readonly prisma: PrismaService) {}

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
        taskId
      },
      include: {
       author:{
        select: {
          ...authorFields,
        },
       },
       task:{
        select: {
          id: true,
          title: true,
          projectId: true,
        },
       }
      },
    })
  }

  create(taskId: string, data: CommentRequestDTO) {
    return this.prisma.comment.create({
      data:{
        ...data,
        taskId,
        authorId: 'cba5c7c3-87e6-4829-82e0-6f3cec653839' //TODO: Remover quando tiver autenticação
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

    const existingComment = await this.findByid(id, taskId)

    if(!existingComment) throw new NotFoundException('Comment not found')

    return this.prisma.comment.update({
      where: {
        id,
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

    const existingComment = await this.findByid(id, taskId)

    if(!existingComment) throw new NotFoundException('Comment not found')

    this.prisma.comment.delete({
      where: {
        id,
        taskId
      },
    })
  }
}
