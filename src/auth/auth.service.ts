import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs";
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if(candidate) {
            throw new HttpException('User with provided email exist.', 400);
        }

        const passwordHash = await bcrypt.hash(userDto.password, 10);

        const user = await this.userService.createUser({
            ...userDto,
            password: passwordHash
        })

        return this.generateToken(user);
    }

    private async generateToken (user:User) {
        const payload = {
            id: user.id,       
            email: user?.dataValues?.email ? user.dataValues.email : user.email, 
            roles: user?.dataValues?.roles ? user.dataValues.roles : user.roles,
        };

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);

        const passwordEquals = await bcrypt.compare(userDto.password, user!.password);
        if(user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Wrong email or password'})
    }
}
