import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async generateAccessToken(id: string): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: `${id}`,
        type: 'access',
      },
      {
        secret: process.env.ACCESS_JWT,
        algorithm: 'HS256',
        expiresIn: '24h',
      },
    );
  }

  public async bearerToken(bearerToken: string): Promise<any> {
    return await this.jwtService.verifyAsync(bearerToken.split(' ')[1], {
      secret: process.env.ACCESS_JWT,
    });
  }
}
