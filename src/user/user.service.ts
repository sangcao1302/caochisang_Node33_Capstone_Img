import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { relative } from 'path';
import { KeyObject } from 'crypto';
import { SaveImage, UserPost, userSaveImage } from './entities/user.entity';
import {UserInfo, UserPostDto} from './dto/postImg.dto';
import { json } from 'stream/consumers';
import { token } from 'src/auth/auth.service';

@Injectable()
export class UserService {
 
  model=new PrismaClient()
 

  async getUser(userId:number,headers:string){
   
    try {
      let getUser=await this.model.nguoi_dung.findFirst({
        where:{
          nguoi_dung_id:Number(userId)
        }
      })
      let {nguoi_dung_id,email,mat_khau,ho_ten,tuoi,anh_dai_dien}=getUser
      if(getUser && headers===token){
        return {
          statusCode:200,
          message:"Thành công",
          data:[{
            nguoi_dung_id,
            email,mat_khau,ho_ten,tuoi,anh_dai_dien
          }]
        }
      }
      
      }
    catch {
       throw new BadRequestException({status:400,content:'Không tồn tại id hình ảnh',dateTime:new Date()})
      }  
  }
 
  async getUserImg(userId:number,headers:string){
      let userImgSave=await this.model.luu_anh.findMany({
        where:{
          nguoi_dung_id:Number(userId)
        }
      })
      if(userImgSave.length!==0  && headers===token ){
        return {
          statusCode:200,
          message:"Thành công",
          data:userImgSave
        }
      }
        throw new BadRequestException({status:400,content:'Không tồn tại id user',dateTime:new Date()})
    }
  
  async getUserCreateImg(userId:number,headers:string){
      let userCreateSave=await this.model.hinh_anh.findMany({
        where:{
          nguoi_dung_id:Number(userId)
        }
      })
      let [hinh_id,ten_hinh,duong_dan,mo_ta,nguoi_dung_id]=userCreateSave
      let data=[]
      data.push(hinh_id,ten_hinh,duong_dan,mo_ta,nguoi_dung_id)
      data.map((item,index)=>{
        if(item===undefined){
          data.splice(index)
        }
      })
      if(userCreateSave.length!==0  && headers===token){
        return {
          statusCode:200,
          message:"Thành công",
          data
        }
      } 
    throw new BadRequestException({statusCode:400,message:"Yêu cầu không hợp lệ",content:'null',dateTime:new Date()})
  }
  
  async delImg(hinhId:number,headers:string){
    try{
      let removeImg= await this.model.hinh_anh.delete({
        where:{
          hinh_id:Number(hinhId)
        }
      })
      if(removeImg  && headers===token)
      {
        return {
          statusCode:200,
          message:"Thành công",
          data:removeImg
        }
        
      }
    }
  catch{
    throw new BadRequestException({status:400,content:'Dữ liệu không đúng',dateTime:new Date()})
  }
}

  async postImg(body:UserPostDto,file:string,userId:number,headers:string){
    let{ten_hinh,duong_dan,mo_ta,nguoi_dung_id}=body
   
     try{
      let findUser= this.model.nguoi_dung.findFirst({
        where:{
          nguoi_dung_id:Number(userId)
        }
      })
      if(findUser  && headers===token){
        return {
          statusCode:200,
          message:"Success",
          data:await this.model.hinh_anh.create({
            data:{
             ten_hinh,
             duong_dan:"localhost:8080/public/table_hinh/"+file,
             mo_ta,
             nguoi_dung_id:Number(nguoi_dung_id)
            }
  
           })
        }
        
      }
     }
     catch{
      throw new BadRequestException({statusCode:400,message:"Yêu cầu không hợp lệ",content:'null',dateTime:new Date()})
     }
  }


  async updateInfoUser(body:UserInfo,file:string,userId:number,headers:string){
    
      let {nguoi_dung_id,email,mat_khau,ho_ten,tuoi,anh_dai_dien}=body
      let findUser=await this.model.nguoi_dung.findFirst({
        where:{
          nguoi_dung_id:Number(userId)
        }  
   })
    if(findUser  && headers===token){
      return{
        statusCode:200,
        message:"Thông tin được cập nhật",
        data:await this.model.nguoi_dung.update({
          where:{
            nguoi_dung_id:Number(nguoi_dung_id)
          },
          data:{
            email,
            mat_khau,
            ho_ten,
            tuoi: Number(tuoi),
            anh_dai_dien: "localhost:8080/public/img/"+file
          }
        })
      }
    }
    throw new BadRequestException({statusCode:400,message:"Yêu cầu không hợp lệ",content:'null',dateTime:new Date()})
  }

  async saveImg(imgId:number,headers:string){
      try{
        let findImgSave= await this.model.luu_anh.findFirst({
          where:{
            hinh_id:Number(imgId)
          }
        })
        let{ngay_luu}=findImgSave
          if(findImgSave && headers===token ){
            return {
              statusCode:200,
              message:"Đã lưu",
              data:{
               Ngayluu:ngay_luu
              }
            }
          }
          else{
            throw new BadRequestException({status:400,message:"Yêu cầu không hợp lệ" ,content:'null',dateTime:new Date()})
          }
      }
      catch{
        throw new BadRequestException({status:400,message:"Yêu cầu không hợp lệ" ,content:'null',dateTime:new Date()})
      }
  }
}


