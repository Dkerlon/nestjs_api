import { ApiProperty } from "@nestjs/swagger"
import { TaskPriority, TaskStatus } from "@prisma/client"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class ProjectsRequestDTO{

  @ApiProperty({description:'Project Name'})
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({description:'Project Description', required: false})
  @IsString()
  @IsOptional()
  description?: string
}

export class ProjectListItemDTO{
  @ApiProperty() id!: string
  @ApiProperty() name!: string
  @ApiProperty() description!: string
  @ApiProperty({format: 'date-time'}) createdAt!: string
  @ApiProperty({format: 'date-time'}) updatedAt!: string
}

export class ProjectTaskDTO{
  @ApiProperty() id!: string
  @ApiProperty() title!: string
  @ApiProperty({nullable: true, required: false}) description?: string
  @ApiProperty({
    enum: TaskStatus,
    default: TaskStatus.TODO
  }) status!: TaskStatus
  @ApiProperty({
    enum: TaskPriority,
    default: TaskPriority.MEDIUM
  }) priority: TaskPriority = TaskPriority.MEDIUM
  @ApiProperty({nullable: true, required: false, format: 'date-time'}) dueDate?: string
  @ApiProperty({format: 'date-time'}) createdAt!: string
  @ApiProperty({format: 'date-time'}) updatedAt!: string
}

export class ProjectFullDTO extends ProjectListItemDTO{
  @ApiProperty({type: [ProjectTaskDTO]}) tasks!: ProjectTaskDTO[]
}


