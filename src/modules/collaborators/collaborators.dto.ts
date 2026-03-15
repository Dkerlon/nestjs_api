import { ApiProperty } from "@nestjs/swagger";
import { CollaboratorRole } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddProjectCollaboratorDTO {
  @ApiProperty({
    description:'Collaborator Role',
    enum: CollaboratorRole,
    default: CollaboratorRole.EDITOR,
    required: false
  })
  @IsEnum(CollaboratorRole)
  @IsOptional()
  role: CollaboratorRole = CollaboratorRole.EDITOR

  @ApiProperty({
    description:'User Id',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  userId!: string
}

export class UpdateProjectCollaboratorDTO {
  @ApiProperty({
    description:'Collaborator Role',
    enum: CollaboratorRole,
    default: CollaboratorRole.EDITOR,
    required: true
  })
  @IsEnum(CollaboratorRole)
  @IsNotEmpty()
  role: CollaboratorRole = CollaboratorRole.EDITOR
}

class ProjectCollaboratorUserDTO {
  @ApiProperty() id!: string
  @ApiProperty() email!: string
  @ApiProperty({nullable: true}) avatar!: string
  @ApiProperty() name!: string
}

export class ProjectCollaboratorListItemDTO{
  @ApiProperty({
    description: 'Collaborator Id',
  })
  id!: string

  @ApiProperty({
    description: 'Collaborator Role',
    enum: CollaboratorRole,
  })
  role!: CollaboratorRole

  @ApiProperty({
    description: 'User Id',
  })
  projectId!: string

  @ApiProperty({
    description: 'User createdAt',
    format: 'date-time'
  })
  createdAt!: string

  @ApiProperty({
    description: 'User updatedAt',
    format: 'date-time'
  })
  updatedAt!: string

  @ApiProperty({
    description: 'User',
  })
 @ApiProperty({
    description: 'User',
    type: ProjectCollaboratorUserDTO,
  })
  user!: ProjectCollaboratorUserDTO

}
