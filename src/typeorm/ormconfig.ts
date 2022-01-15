import { ConnectionOptions } from 'typeorm';
import 'dotenv/config';
import { User } from '../user/entity/user.entity';
import { Post } from '../post/entity/post.entity';

interface DBConnectionOptions {
  [env: string]: ConnectionOptions;
}

const connectionOptions: DBConnectionOptions = {
  SDK: {
    type: 'mysql',
    host: process.env.HOST,
    port: +process.env.PORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.NAME,
    entities: [User, Post],
    synchronize: false,
  },
};

export { connectionOptions };
