import { ApiProperty } from "@nestjs/swagger"
import {  Role } from "@prisma/client"
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDTO {
  @ApiProperty({description: 'User name'})
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({description: 'User email', uniqueItems: true})
  @IsEmail()
  @IsNotEmpty()
  email!: string

  @ApiProperty({description: 'User password', minLength: 6})
  @IsString()
  @IsNotEmpty()
  password!: string

  @ApiProperty({
    description: 'User Role',
    minLength: 6,
    enum: Role,
    default: Role.USER,
    required: false
  })
  @IsString()
  @IsOptional()
  @IsEnum(Role)
  role?: Role
}

export class UpdateUserDTO {
  @ApiProperty({
    description: 'User name',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({
    description: 'User Role',
    minLength: 6,
    enum: Role,
    default: Role.USER,
    required: false
  })
  @IsString()
  @IsOptional()
  @IsEnum(Role)
  role?: Role
}

export class UserListItemDTO {
  @ApiProperty({ description: 'User ID' })
  id!: string

  @ApiProperty({ description: 'User name' })
  name!: string

  @ApiProperty({ description: 'User email' })
  email!: string

  @ApiProperty({ description: 'User Role', enum: Role })
  role: Role = Role.USER

  @ApiProperty({ description: 'User avatar URL', required: false })
  avatar!: string | null

  @ApiProperty({ description: 'Creation date' })
  createdAt!: string

  @ApiProperty({ description: 'Last update date' })
  updatedAt!: string
}

class userProjectDTO{
  @ApiProperty() id!: string
  @ApiProperty() name!: string
  @ApiProperty() description!: string
  @ApiProperty() createdAt!: string
  @ApiProperty() updatedAt!: string
}

export class UserFullDTO extends UserListItemDTO{
  @ApiProperty({ type: [userProjectDTO], required: false })
  createdProjects?: userProjectDTO[]
}
