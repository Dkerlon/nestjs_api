import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
@Module({
  imports:[
    MailerModule.forRoot({
      transport:{
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth:{
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      },
      defaults:{
        from: '"Curso NestJS" <no-reply@kerlon.dev>',
      },
      template:{
        dir: path.join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options:{
          strict: true
        }
      },
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
