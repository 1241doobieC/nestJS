// Please not modify this file

import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

export class UserPost extends User {
  id: number;
  name: string;
  email: string;
  posts: Post[];
}
