import { PostListResponse } from './postList.response';

export class ProfileResponse {
  post_list: PostListResponse[];
  name: string;
  image: string;
  school: string;
}
