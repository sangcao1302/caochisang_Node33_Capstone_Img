import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode,Headers } from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { get } from 'http';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Image")
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @HttpCode(200)
  @Get('/hinhanh')
  getImg(@Headers("token") headers:string){
    return this.imageService.getImg(headers)
  }
  @Get('/hinhanh/:search')
  getImgName(@Param('search') search:string,@Headers("token") headers:string){
    return this.imageService.getImgName(search,headers)
  }

  @Get('/info/hinhanh/user/:hinhId')
  getInfoUserImg(@Param('hinhId') hinhId:number,@Headers("token") headers:string){
    return this.imageService.getInfoUserImg(hinhId,headers)
  }
 
}
