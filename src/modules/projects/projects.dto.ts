import { ApiProperty } from "@nestjs/swagger"
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
