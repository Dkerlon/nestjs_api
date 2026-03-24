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
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger'
import { ValidateResourcesIds } from 'src/common/decorators/validate-resources-ids.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { ValidateResourcesIdsInterceptor } from 'src/common/interceptors/validate-resources-ids.interceptor'
import { CommentFullDTO, CommentListItemDTO, CommentRequestDTO } from './comments.dto'
import { CommentsService } from './comments.service'
import { ApiPaginatedResponse } from 'src/common/swagger/api-paginated-response'
import { queryPaginationDTO } from 'src/common/dtos/query-pagination.dto'

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks/:taskId/comments',
})
@UseInterceptors(ValidateResourcesIdsInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiPaginatedResponse(CommentFullDTO)
  @ValidateResourcesIds()
  findAllByTask(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Query() query?: queryPaginationDTO,
  ) {
    return this.commentsService.findAllByTask(taskId, query)
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
  @UseGuards(JwtAuthGuard)
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
