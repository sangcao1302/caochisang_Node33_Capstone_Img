import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode,UseGuards,Headers,Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './dto/comment.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

// @ApiBearerAuth()
// @UseGuards(AuthGuard("jwt"))
@ApiTags('Commnent')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @HttpCode(200)
  @Get('binhluan/:hinhId')
  getComment(@Param('hinhId') hinhId:number,@Headers("token") headers:string){
    return this.commentService.getComment(hinhId,headers)
  }
  @HttpCode(200)
  // @ApiConsumes('multipart/form-data')
  @Post("/binhluan/:userId")
  postComment(@Body() body:Comment,@Param ('userId') userId:number,@Headers("token") headers:string){
    return this.commentService.postComment(body,userId,headers)
  }

}
