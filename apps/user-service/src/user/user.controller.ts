import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('createUser')
    createUser(@Body() data: CreateUserDto) {
        return this.userService.createUser(data);
    }

    @Get('all')
    getAllUsers() {
        return this.userService.getUsers();
    }

    @Get('byId')
    getUserById(@Body('id') id: number) {
        return this.userService.getUserById(id);
    }
}
