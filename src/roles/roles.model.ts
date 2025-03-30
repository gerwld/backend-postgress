import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";


export interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({
    tableName: 'roles'
})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example: '1', description: 'Айди'})
    @Column({
        type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true
    })
    declare id: number;

    @ApiProperty({example: 'ADMIN', description: 'Название роли'})
    @Column({
        type: DataType.STRING, unique: true, allowNull: false, defaultValue: "USER"
    })
    value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column({
        type: DataType.STRING, allowNull: false
    })
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}