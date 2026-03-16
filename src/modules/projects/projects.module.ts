import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/modules/request-context-module/request-context.service'
import { PrismaService } from 'src/prisma.service'
import { ProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
})
export class ProjectsModule {}
