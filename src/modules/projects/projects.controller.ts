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
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { ValidateResourcesIds } from 'src/common/decorators/validate-resources-ids.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { ValidateResourcesIdsInterceptor } from 'src/common/interceptors/validate-resources-ids.interceptor'
import { ProjectFullDTO, ProjectListItemDTO, ProjectsRequestDTO } from './projects.dto'
import { ProjectsService } from './projects.service'
import { queryPaginationDTO } from 'src/common/dtos/query-pagination.dto'
import { ApiPaginatedResponse } from 'src/common/swagger/api-paginated-response'

@Controller({
  version: '1',
  path: 'projects',
})
@UseInterceptors(ValidateResourcesIdsInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt')
export class ProjectsController {
  constructor(private readonly ProjectsService: ProjectsService) {}

  @Get()
  @ApiPaginatedResponse(ProjectFullDTO)
  findAll(@Query() query?: queryPaginationDTO) {
    return this.ProjectsService.findAll(query)
  }

  @Get(':projectId')
  @ApiResponse({
    type: ProjectFullDTO,
  })
  @ValidateResourcesIds()
  async findOne(@Param('projectId', ParseUUIDPipe) id: string) {
    return await this.ProjectsService.findById(id)
  }

  @Post()
  @ApiResponse({
    type: ProjectListItemDTO,
  })
  create(@Body() data: ProjectsRequestDTO) {
    return this.ProjectsService.create(data)
  }

  @Put(':projectId')
  @ApiResponse({
    type: ProjectFullDTO,
  })
  @ValidateResourcesIds()
  async update(@Param('projectId', ParseUUIDPipe) id: string, @Body() data: ProjectsRequestDTO) {
    return this.ProjectsService.update(id, data)
  }

  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ValidateResourcesIds()
  async remove(@Param('projectId', ParseUUIDPipe) id: string) {
    return this.ProjectsService.remove(id)
  }
}
