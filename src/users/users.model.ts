import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";


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
    _id: number;

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
}