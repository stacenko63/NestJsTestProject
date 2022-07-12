import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {

        const user = await this.usersService.getUserByMail(userDto.email);

        if (!user) {
            throw new HttpException('Пользователя с таким электронным адресом не существует!', HttpStatus.BAD_REQUEST);
        }


        if (!await bcrypt.compare(userDto.password, user.password)) {
            throw new UnauthorizedException({message: 'Неправильный пароль!'});
        }


        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {

        if (await this.usersService.getUserByMail(userDto.email)) {
            throw new HttpException('Пользователь с таким электронным адресом уже занят!', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);

        const user = await this.usersService.createUser({email: userDto.email, password: hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return {
            token: this.jwtService.sign(payload)
        }
    }


}
