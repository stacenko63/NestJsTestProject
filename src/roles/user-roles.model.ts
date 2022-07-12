import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {User} from "../users/users.model";




@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @ApiProperty({example: 'user@mail.ru', description: 'Идентификатор пользователя'})
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Role)
    @ApiProperty({example: '123456', description: 'Идентификатор роли'})
    @Column({type: DataType.INTEGER})
    roleId: number;


}