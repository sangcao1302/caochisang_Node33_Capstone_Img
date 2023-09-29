import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends  PassportStrategy(Strategy) {

    // kết hợp với middlewarw Guard, tự động kiếm tra token 
    // Bearer token
    constructor(config: ConfigService) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "SangCao",
        });
    }

    async validate(tokenDecode: any) {


        return tokenDecode
    }

}