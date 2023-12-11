import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma/prisma.service';



@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
