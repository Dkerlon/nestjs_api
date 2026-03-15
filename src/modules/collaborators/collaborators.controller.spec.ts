import { Test, TestingModule } from '@nestjs/testing'
import { CollaboratosController } from './collaborators.controller'

describe('CollaboratosController', () => {
  let controller: CollaboratosController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollaboratosController],
    }).compile()

    controller = module.get<CollaboratosController>(CollaboratosController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
