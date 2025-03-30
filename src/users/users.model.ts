import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";


export interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({
    tableName: 'users'
})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Айди'})
    @Column({
        type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true
    })
    declare id: number;

    @ApiProperty({example: 'john@gmail.com', description: 'Емейл'})
    @Column({
        type: DataType.STRING, unique: true, allowNull: false
    })
    email: string;

    @ApiProperty({example: '*********', description: 'Пароль'})
    @Column({
        type: DataType.STRING, allowNull: false
    })
    password: string;

    @ApiProperty({example: 'true', description: 'Статус блокировки'})
    @Column({
        type: DataType.BOOLEAN, defaultValue: false
    })
    banned: boolean;

    @ApiProperty({example: 'Скам', description: 'Причина блокировки'})
    @Column({
        type: DataType.STRING, allowNull: true
    })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}