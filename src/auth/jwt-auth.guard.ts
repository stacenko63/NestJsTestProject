import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest() //получаем объект request из контекста
        try {
            const authHeader = req.headers.authorization; //вытаскиваем header, который называется authorization
            const bearer = authHeader.split(' ')[0] //тип токена
            const token = authHeader.split(' ')[1] //сам токен

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            const user = this.jwtService.verify(token);  //расшифровка токена
            req.user = user; //после раскодирования помещаем его в request
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    }

}