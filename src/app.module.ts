import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RequestContextModule } from './common/modules/RequestContext/request-context.module'
import { CloudinaryService } from './common/services/cloudinary/cloudinary.service'
import { AuthModule } from './modules/auth/auth.module'
import { CollaboratorsModule } from './modules/collaborators/collaborators.module'
import { CommentsModule } from './modules/comments/comments.module'
import { MailModule } from './modules/mail/mail.module'
import { ProjectsModule } from './modules/projects/projects.module'
import { TasksModule } from './modules/tasks/tasks.module'
import { UsersModule } from './modules/users/users.module'
import { PrismaService } from './prisma.service'

@Module({
  imports: [
    ProjectsModule,
    TasksModule,
    UsersModule,
    CollaboratorsModule,
    CommentsModule,
    AuthModule,
    MailModule,
    RequestContextModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CloudinaryService],
})
export class AppModule {}
