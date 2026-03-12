import { ApiProperty } from "@nestjs/swagger"
import { TaskPriority, TaskStatus } from "@prisma/client"
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class TaskDTO{
  @ApiProperty({description: 'Task Title'})
  @IsString()
  @IsNotEmpty()
  title!: string

  @ApiProperty({description: 'Task Description'})
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({
    enum: TaskStatus,
    default: TaskStatus.TODO,
    description: 'Task Status'
  })
  @IsEnum(TaskStatus)
  @IsString()
  @IsOptional()
  status?: TaskStatus = TaskStatus.TODO

  @ApiProperty({
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
    description: 'Task Priority'
  })
  @IsEnum(TaskPriority)
  @IsString()
  @IsNotEmpty()
  priority: TaskPriority = TaskPriority.MEDIUM

  @ApiProperty({description: 'Task DueDate'})
  @IsOptional()
  @IsDateString()
  dueDate?: Date
}
