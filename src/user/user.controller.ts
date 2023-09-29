import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put, HttpCode,Headers } from '@nestjs/common';
import { UserService } from './user.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserInfo, UserPostDto } from './dto/postImg.dto';
import { SaveImage } from './entities/user.entity';
@ApiTags('User')
@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) {}
  @HttpCode(200)
  @Get('/profile/:userId')
  getUser(@Param('userId') userId:number,@Headers("token") headers:string){
      return this.userService.getUser(userId,headers)
  }

  @Get('/saveImg/:userId')
  getUserImg(@Param('userId') userId:number,@Headers("token") headers:string){
    return this.userService.getUserImg(userId,headers)
}
@ApiConsumes('multipart/form-data')
@Post("/postImg/:userId")
@UseInterceptors(
  FileInterceptor("duong_dan", // key của FE gửi lên
    {
      // định nghĩa nơi lưu và đặt tên mới
      storage: diskStorage({
        destination: process.cwd() + "/public/table_hinh",
        filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
      })

    }
  )
)
postImg(@Body() body:UserPostDto, @UploadedFile() duong_dan: Express.Multer.File,@Param ('userId') userId:number,@Headers("token") headers:string){
  return this.userService.postImg(body,duong_dan.filename,userId,headers)
}
@ApiConsumes('multipart/form-data')
@Put('update/infoUser/:userId')
@UseInterceptors(
  FileInterceptor("anh_dai_dien", // key của FE gửi lên
    {
      // định nghĩa nơi lưu và đặt tên mới
      storage: diskStorage({
        destination: process.cwd() + "/public/img",
        filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
      })

    }
  )
)
updateInfoUser(@Body() body:UserInfo , @UploadedFile() anh_dai_dien: Express.Multer.File,@Param ('userId') userId:number,@Headers("token") headers:string){
  return this.userService.updateInfoUser(body,anh_dai_dien.filename,userId,headers)
}
@Get('createImg/:userId')
getUserCreateImg(@Param('userId') userId:number,@Headers("token") headers:string){
  return this.userService.getUserCreateImg(userId,headers)
}
@Delete('deleteImg/:hinhId')
delImg(@Param('hinhId') hinhId:number,@Headers("token") headers:string){
  return this.userService.delImg(hinhId,headers)
}

@Get('save/img/:imgId')
saveImg(@Param('imgId') imgId:number,@Headers("token") headers:string){
  return this.userService.saveImg(imgId,headers)
}
}
