import { Controller, Get } from '@nestjs/common';

@Controller({
  version: '2'
})
export class AppController2 {

  @Get()
  getHealthCheck(): {message : string} {
    return {message:'v2 rodando'}
  }
}
