// timezone.module.ts
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'TIMEZONE',
      useValue: 'GMT',
    },
  ],
  exports: ['TIMEZONE'],
})
export class TimezoneModule {}
