import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from '../../infrastracture/entities/Session/Session.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    private readonly userService: UserService,
  ) {}

  async insert(session: SessionEntity): Promise<void> {
    await this.sessionRepository.save(session);
  }

  async invalidate(sessionId: string): Promise<void> {
    const stored = await this.getById(sessionId);
    await this.sessionRepository.save({
      invalidated: true,
      ...stored,
    });
  }

  async invalidateForUser(userId: string): Promise<void> {
    const sessions = await this.getAllByUserId(userId);
    for (const session of sessions) {
      session.invalidate = true;
      await this.sessionRepository.save(session);
    }
  }

  async validate(userId: string, sessionId: string): Promise<boolean> {
    const stored = await this.getByUserId(userId);
    if (stored.id !== sessionId) {
      throw new NotFoundException('Session not found');
    }
    return stored.id === sessionId;
  }

  async getByAccessToken(accessToken: string): Promise<SessionEntity> {
    return await this.sessionRepository.findOneBy({
      accessToken: accessToken,
    });
  }

  async getByUserId(userId: string): Promise<SessionEntity> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.sessionRepository.findOneBy({
      user: {
        id: userId,
      },
    });
  }

  async getAllByUserId(userId: string): Promise<SessionEntity[]> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.sessionRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  async getAll(): Promise<SessionEntity[]> {
    return await this.sessionRepository.find();
  }

  private async getById(sessionId: string): Promise<SessionEntity> {
    return await this.sessionRepository.findOneBy({
      id: sessionId,
    });
  }
}
