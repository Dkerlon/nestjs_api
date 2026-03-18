import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma.service'
import { MailService } from '../mail/mail.service'
import { UsersService } from '../users/users.service'
import { SignInDTO, SignUpDTO } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async signUp(data: SignUpDTO) {
    //Criptografar a senha
    const hash = await bcrypt.hash(data.password, 12)
    data.password = hash

    //Salvar o usuário no banco de dados
    const newUser = await this.usersService.create(data)

    //retornar o token JWT de acesso
    return {
      token: this.jwtService.sign({
        sub: newUser.id,
      }),
    }
  }

  async signIn(data: SignInDTO) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: data.email,
      },
    })

    if (user && (await bcrypt.compare(data.password, user.password))) {
      return {
        token: this.jwtService.sign({
          sub: user.id,
        }),
      }
    }

    throw new UnauthorizedException('Invalid credentials')
  }

  async forgotPassword(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      purpose: 'password_reset',
    })

    await this.mailService.sendPasswordRequest(user.email, token)

    return {
      message: 'Password reset email sent',
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token)
      console.error(payload)
      if (payload.purpose !== 'password_reset') {
        throw new BadRequestException('Invalid token')
      }

      const user = await this.usersService.findById(payload.sub)

      if (!user) {
        throw new BadRequestException('Invalid token')
      }

      const hash = await bcrypt.hash(newPassword, 12)

      return await this.usersService.update(user.id, {
        password: hash,
      })
    } catch (err) {
      console.error(err)
      throw new BadRequestException('Invalid or expired token')
    }
  }
}
