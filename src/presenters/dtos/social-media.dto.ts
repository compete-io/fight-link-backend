import { AutoMap } from '@automapper/classes';

export class SocialMediaDto {
  @AutoMap()
  website: string;
  @AutoMap()
  facebook: string;
  @AutoMap()
  instagram: string;
  @AutoMap()
  tikTok: string;
}
