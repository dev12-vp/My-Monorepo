import { BadRequestException, Body, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { ILike, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) { }

    async findAll(page = 1, limit = 10, search?: string, order: 'ASC' | 'DESC' = 'DESC') {
        try {
            const skip = (page - 1) * limit;
            console.log('page', page)
            console.log('limit', limit)
            const [data, total] = await this.postRepository.findAndCount(
                {
                    where: search ? { title: ILike(`%${search}%`) } : {},
                    order: { createAt: order },
                    take: limit,
                    skip
                })
            if (!data.length) {
                throw new NotFoundException('Data not found!')
            }

            return {
                data: data,
                total: total,
                page: page,
                totalPage: Math.ceil(total / limit)
            }
        } catch (error) {
            console.log("error", error)
            throw new InternalServerErrorException('Failed to fetch request please try later')
        }
    }

    async create(createPostDto: CreatePostDto): Promise<Post> {
        try {
            const post = this.postRepository.create(createPostDto);
            return this.postRepository.save(post)
        } catch (error) {
            console.log("error", error)
            throw new InternalServerErrorException('Failed to fetch request please try later')
        }
    }

    async findOne(id: number) {
        try {
            // if(!id){
            //    throw new BadRequestException('Please pass id')
            // }
            const postData = await this.postRepository.findOne({ where: { id }})
            console.log('postData', postData)
            if (!postData) throw new NotFoundException(`Post with id ${id} not found!`);
            return postData;
        } catch (error) {
            console.log("error", error)
            throw new InternalServerErrorException('Failed to fetch request please try later')
        }

    }

    async deleteOne(id: number) {
        try {
            if (!id) {
                throw new BadRequestException('Please pass id')
            }
            const deletePost = await this.postRepository.delete(id)
            if (deletePost.affected == 0) throw new NotFoundException(`Post with id ${id} not found!`)
            return ({ message: "Your post remove successfully" })
        } catch (error) {
            console.log("error", error)
            throw new InternalServerErrorException('Failed to fetch request please try later')
        }

    }

    async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
        try {
            await this.postRepository.update(id, updatePostDto);
            return this.findOne(id);
        } catch (error) {
            console.log("error", error)
            throw new InternalServerErrorException('Failed to fetch request please try later')
        }

    }

}

