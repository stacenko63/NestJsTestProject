import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {User} from "../users/users.model";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Role} from "./roles.model";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200})
    @Post()
    async create(@Body() roleDto: CreateRoleDto) {
        await this.rolesService.createRole(roleDto);
    }

    @ApiOperation({summary: 'Получение роли по ее значению'})
    @ApiResponse({status: 200, type: Role})
    @Get('/:value')
    async getRoleByValue(@Param('value') value: string) {
        return await this.rolesService.getRoleByValue(value);
    }

}
