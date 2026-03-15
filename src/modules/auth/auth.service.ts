import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma.service'
import { UsersService } from '../users/users.service'
import { SignInDTO, SignUpDTO } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signUp(data: SignUpDTO) {
    //Criptografar a senha
    const hash = await bcrypt.hash(data.password, 12)
    data.password = hash

    //Salvar o usuário no banco de dados
    const newUser = await this.usersService.create(data)

    //retornar o token JWT de acesso
    return{
      token: this.jwtService.sign({
        sub: newUser.id,
        name: newUser.name,
        role: newUser.role
      })
    }
  }

  async signIn(data: SignInDTO) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: data.email,
      }
    })

    if(user && await bcrypt.compare(data.password, user.password)){
      return{
        token: this.jwtService.sign({
          sub: user.id,
          name: user.name,
          role: user.role
        })
      }
    }

    throw new UnauthorizedException("Invalid credentials")
  }
}
