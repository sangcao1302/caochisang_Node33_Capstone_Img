import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaClient } from '@prisma/client';
import { token } from 'src/auth/auth.service';
@Injectable()
export class ImageService {
  model=new PrismaClient()
  async getImg(headers:string){
    try{
      let getAllImg=  await this.model.hinh_anh.findMany()
    
      if(getAllImg.length!==0 && headers===token){
        return {
          statusCode:200,
          message:"Thành công",
          data:getAllImg
        }
      }
      else{
        throw new BadRequestException({statusCode:400,message:"Yêu cầu không hợp lệ",content:'null',dateTime:new Date()})
      }
    }catch{
      throw new BadRequestException({status:500,content:'Lỗi Back End.Vui lòng liên hệ',dateTime:new Date()})
    }
  
  }
  async getImgName(search:string,headers:string){ 
    
      let findImg= await this.model.hinh_anh.findMany({
        where:{
          ten_hinh:{
            contains:search
          }
        }
      })
      let [hinh_id,ten_hinh,duong_dan,mo_ta,nguoi_dung_id]=findImg
      let data=[]
      data.push(hinh_id,ten_hinh,duong_dan,mo_ta,nguoi_dung_id)
      data.map((item,index)=>{
        if(item===undefined){
          data.splice(index)
        }
      })
      if(findImg.length!==0 && headers===token){
        return {
          statusCode:200,
          message:"Thành công",
          data
        }
      }
      throw new BadRequestException({statusCode:400,message:"Yêu cầu không hợp lệ",content:'null',dateTime:new Date()})
  }

  async getInfoUserImg(hinhId:number,headers:string){
      let getInfoImg= await this.model.hinh_anh.findMany({
        where:{
          hinh_id:Number(hinhId)
        },
        include:{
          nguoi_dung:true,
        }
      })
      if(getInfoImg.length!==0 && headers===token){
        return{
          statusCode:200,
          message:"Thành công",
          data:getInfoImg
        }
      }
      else{
        throw new BadRequestException({statusCode:400,message:"Yêu cầu không hợp lệ",content:'null',dateTime:new Date()})
      }
    
  }
}
