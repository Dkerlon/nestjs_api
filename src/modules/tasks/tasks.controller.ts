import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common'
import { ValidateResourcesIds } from 'src/common/decorators/validate-resources-ids.decorator'
import { ValidateResourcesIdsInterceptor } from 'src/common/interceptors/validate-resources-ids.interceptor'
import { PrismaService } from 'src/prisma.service'
import { TaskDTO } from './tasks.dto'
import { TasksService } from './tasks.service'
import { ApiResponse } from '@nestjs/swagger'

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks',
})
@UseInterceptors(ValidateResourcesIdsInterceptor)
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @ValidateResourcesIds()
  @ApiResponse({
    type: [TaskDTO],
  })
  async findAllByProject(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return await this.tasksService.findAllByProject(projectId)
  }

  @Get(':taskId')
  @ValidateResourcesIds()
  @ApiResponse({
    type: TaskDTO,
  })
  async findById(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return await this.tasksService.findById(projectId, taskId)
  }

  @Post()
  @ApiResponse({
    type: [TaskDTO],
  })
  @ValidateResourcesIds()
  async create(@Param('projectId', ParseUUIDPipe) projectId: string, @Body() data: TaskDTO) {
    return await this.tasksService.create(projectId, data)
  }

  @Put(':taskId')
  @ApiResponse({
    type: [TaskDTO],
  })
  @ValidateResourcesIds()
  async update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() data: TaskDTO,
  ) {
    return await this.tasksService.update(projectId, taskId, data)
  }

  @Delete(':taskId')
  @ValidateResourcesIds()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    await this.prismaService.task.deleteMany({
      where: {
        projectId,
      },
    })
    return await this.tasksService.delete(projectId, taskId)
  }
}
