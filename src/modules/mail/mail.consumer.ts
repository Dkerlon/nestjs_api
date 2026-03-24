import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { MailerService } from '@nestjs-modules/mailer'
import { SEND_PASSWORD_RESET } from 'src/consts'

@Controller()
export class MailConsumer {
  constructor(private mailer: MailerService) {}

  @EventPattern(SEND_PASSWORD_RESET)
  async HandlePassWordReset(@Payload() data:  {email: string, url: string}){
    await this.mailer.sendMail({
      to: data.email,
      subject: 'Redefinição de senha',
      template: 'forgot-password',
      context: { url: data.url }
    })
  }
}
