import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Comment } from './entities/comment.entity';
import { JwtService } from '@nestjs/jwt';
import { token } from 'src/auth/auth.service';
import { Request } from 'express';
@Injectable()
export class CommentService {
  model=new PrismaClient()
  async getComment(hinhId:number,headers:string){
    let getCommentUser=await this.model.binh_luan.findMany({
      where:{
        hinh_id:Number(hinhId)
      },
      include:{
        nguoi_dung:true
      }
    })
    
    if(getCommentUser.length!==0 && headers===token) 
    {
      console.log(token)
      return {
        statusCode:200,
        message:"Thành công",
        data:getCommentUser
      }
    }
    else{
      throw new BadRequestException({statusCode:400,message:"Yêu cầu không hợp lệ",content:'null',dateTime:new Date()})
    }
  }

  async postComment(body:Comment,userId:number,headers:string){
      let {nguoi_dung_id,hinh_id,ngay_binh_luan,noi_dung}=body
      try{
        let findUser=this.model.nguoi_dung.findFirst({
          where:{
            nguoi_dung_id:Number(userId)
          }
        })
        if(findUser && headers===token){
          return {
            statusCode:200,
            message:"Thành công",
            data:await this.model.binh_luan.create({
              data:{
                nguoi_dung_id:Number(nguoi_dung_id),
                hinh_id:Number(hinh_id),
                ngay_binh_luan,
                noi_dung,
              }
             })
          }   

        }
        else{
          throw new BadRequestException({statusCode:400,message:"Token sai",content:'null',dateTime:new Date()})
  
         }
       }
      

       catch(exp)
       {
        return exp.response
       }
  }
}
