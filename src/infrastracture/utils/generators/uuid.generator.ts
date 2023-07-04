import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UuidGenerator {
  generate() {
    return randomUUID();
  }
}
