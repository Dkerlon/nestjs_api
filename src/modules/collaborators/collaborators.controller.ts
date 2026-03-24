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
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiResponse } from '@nestjs/swagger'
import { ValidateResourcesIds } from 'src/common/decorators/validate-resources-ids.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { ValidateResourcesIdsInterceptor } from 'src/common/interceptors/validate-resources-ids.interceptor'
import {
  AddProjectCollaboratorDTO,
  ProjectCollaboratorListItemDTO,
  UpdateProjectCollaboratorDTO,
} from './collaborators.dto'
import { CollaboratorsService } from './collaborators.service'
import { ApiPaginatedResponse } from 'src/common/swagger/api-paginated-response'
import { queryPaginationDTO } from 'src/common/dtos/query-pagination.dto'

@Controller({
  version: '1',
  path: 'projects/collaborators',
})
@UseInterceptors(ValidateResourcesIdsInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt')
export class CollaboratorsController {
  constructor(private readonly service: CollaboratorsService) {}

  @Get(':projectId')
  @ValidateResourcesIds()
  @ApiPaginatedResponse(ProjectCollaboratorListItemDTO)
  findAllByProject(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Query() query?: queryPaginationDTO
  ) {
    return this.service.findAllByProject(projectId, query)
  }

  @Post(':projectId')
  @ValidateResourcesIds()
  @ApiCreatedResponse({
    type: AddProjectCollaboratorDTO,
  })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() data: AddProjectCollaboratorDTO,
  ) {
    return this.service.create(projectId, data)
  }

  @Put(':projectId/:userId')
  @ValidateResourcesIds()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UpdateProjectCollaboratorDTO,
  })
  update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() data: UpdateProjectCollaboratorDTO,
  ) {
    return this.service.update(projectId, userId, data)
  }

  @Delete(':projectId/:userId')
  @ValidateResourcesIds()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.service.delete(projectId, userId)
  }
}
