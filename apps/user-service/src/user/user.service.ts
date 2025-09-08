import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@my-workspace/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    createUser(dto: CreateUserDto) {
        const user = this.userRepo.create(dto);
        return this.userRepo.save(user);
    }

    getUsers() {
        return this.userRepo.find();
    }
    
    getUserById(id: number) {
        return this.userRepo.findOneBy({ id });
    }
}
