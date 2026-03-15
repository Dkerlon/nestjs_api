import { Test, TestingModule } from '@nestjs/testing'
import { CollaboratosService } from './collaborators.service'

describe('CollaboratosService', () => {
  let service: CollaboratosService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollaboratosService],
    }).compile()

    service = module.get<CollaboratosService>(CollaboratosService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
