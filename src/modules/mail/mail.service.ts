import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService){}

  async sendPasswordRequest(email: string, token: string){
    await this.mailerService.sendMail({
      to: email,
      subject: 'Redefinição de senha',
      template: 'forgot-password.hbs',
      context:{
        url: `http://localhost:3000/auth/reset-password?token=${token}`
      }
    })
  }
}
