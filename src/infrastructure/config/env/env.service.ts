import { parse } from 'dotenv';
import { readFileSync } from 'fs';

export class EnvironmentService {
  private readonly config: { [key: string]: string | null } = {};
  constructor(path: string) {
    this.config = parse(readFileSync(path));
  }

  get(key: string): string {
    return this.config[key] || null;
  }
}
