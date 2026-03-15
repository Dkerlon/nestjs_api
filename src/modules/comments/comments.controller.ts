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
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger'
import { ValidateResourcesIds } from 'src/common/decorators/validate-resources-ids.decorator'
import { ValidateResourcesIdsInterceptor } from 'src/common/interceptors/validate-resources-ids.interceptor'
import { CommentFullDTO, CommentListItemDTO, CommentRequestDTO } from './comments.dto'
import { CommentsService } from './comments.service'

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks/:taskId/comments',
})
@UseInterceptors(ValidateResourcesIdsInterceptor)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiResponse({
    type: [CommentFullDTO],
  })
  @ValidateResourcesIds()
  findAllByTask(@Param('taskId', ParseUUIDPipe) taskId: string) {
    return this.commentsService.findAllByTask(taskId)
  }

  @Get(':commentId')
  @ValidateResourcesIds()
  @ApiResponse({
    type: CommentListItemDTO,
  })
  findByid(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('commentId', ParseUUIDPipe) id: string,
  ) {
    return this.commentsService.findByid(id, taskId)
  }

  @Post()
  @ValidateResourcesIds()
  @ApiCreatedResponse({
    type: CommentListItemDTO,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Param('taskId', ParseUUIDPipe) taskId: string, @Body() data: CommentRequestDTO) {
    return this.commentsService.create(taskId, data)
  }

  @Put(':commentId')
  @ValidateResourcesIds()
  @ApiOkResponse({
    type: CommentListItemDTO,
  })
  update(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('commentId', ParseUUIDPipe) id: string,
    @Body() data: CommentRequestDTO,
  ) {
    return this.commentsService.update(taskId, id, data)
  }

  @Delete(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ValidateResourcesIds()
  delete(
    @Param('commentId', ParseUUIDPipe) id: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.commentsService.delete(taskId, id)
  }
}
