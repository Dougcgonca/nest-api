import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()


export class UserService {

  constructor(private readonly prisma: PrismaService) {
  }
  async create(createUserDto: CreateUserDto) {
    const { email }= createUserDto
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      throw new Error('O e-mail já está em uso.');
    }

      return this.prisma.user.create({
      data: createUserDto
    })
  }

  findAll() {
    return this.prisma.user.findMany();

  }

  async findOne(id: number) {
    const alreadyExist= await this.prisma.user.findUnique({
      where : { id }
    })

    if(!alreadyExist){
      throw new Error('Não é possível encontrar um usuário que não existe')
    }
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const alreadyExist= await this.prisma.user.findUnique({
      where : { id }
    })

    if(!alreadyExist){
      throw new Error('Não é possível atualizar um usuário que não existe')
    }
    return this.prisma.user.update({
      where: { id},
      data: updateUserDto
    })
  }

  async remove(id: number) {
    const alreadyExist= await this.prisma.user.findUnique({
      where : { id }
    })

    if(!alreadyExist){
      throw new Error('Não é possível remover um usuário que não existe')
    }
    
    return this.prisma.user.delete({
      where: {id}
    })
  }
}
