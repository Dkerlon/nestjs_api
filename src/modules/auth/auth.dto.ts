import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignUpDTO {
  @ApiProperty({ description: 'Username' })
  @IsNotEmpty()
  @IsString()
  name!: string

  @ApiProperty({ description: 'User email', uniqueItems: true })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email!: string

  @ApiProperty({ description: 'User password', minLength: 6 })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string

  @ApiProperty({
    description: 'User role',
    enum: Role,
    default: Role.ADMIN,
    required: false
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role?: Role = Role.ADMIN
}

export class SignInDTO {
  @ApiProperty({ description: 'User email'})
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email!: string

  @ApiProperty({ description: 'User password', minLength: 6 })
  @IsNotEmpty()
  @IsString()
  password!: string
}

export class ForgetPasswordDTO {
  @ApiProperty({ description: 'User email'})
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email!: string
}

export class ResetPasswordDTO {
  @ApiProperty({ description: 'User token'})
  @IsNotEmpty()
  @IsString()
  token!: string

  @ApiProperty({ description: 'User password', minLength: 6 })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string
}
