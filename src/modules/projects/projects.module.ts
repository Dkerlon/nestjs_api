import { Module } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { PrismaService } from 'src/prisma.service'
import { ProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, RequestContextService],
})
export class ProjectsModule {}
