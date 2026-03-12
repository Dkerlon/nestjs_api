import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { ProjectListItemDTO, ProjectsRequestDTO } from './projects.dto'
import { ProjectsService } from './projects.service'

@Controller({
  version: '1',
  path: 'projects',
})
export class ProjectsController {
  constructor(private readonly ProjectsService: ProjectsService) {}

  @Get()
  @ApiResponse({
    type: [ProjectListItemDTO],
  })
  findAll() {
    return this.ProjectsService.findAll()
  }

  @Get(':id')
  @ApiResponse({
    type: ProjectListItemDTO,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ProjectsService.findById(id)
  }

  @Post()
  @ApiResponse({
    type: ProjectListItemDTO,
  })
  create(@Body() data: ProjectsRequestDTO) {
    return this.ProjectsService.create(data)
  }

  @Put(':id')
  @ApiResponse({
    type: ProjectListItemDTO,
  })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: ProjectsRequestDTO) {
    return this.ProjectsService.update(id, data)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ProjectsService.remove(id)
  }
}
