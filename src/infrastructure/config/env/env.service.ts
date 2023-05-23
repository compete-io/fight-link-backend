import { parse } from 'dotenv';
import { readFileSync } from 'fs';

export class EnvService {
  private readonly config: { [key: string]: string | undefined } = {};
  constructor(path: string) {
    this.config = parse(readFileSync(path));
  }

  get(key: string): string {
    return this.config[key] || '';
  }
}
