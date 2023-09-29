import { Injectable , HttpException,HttpStatus, BadRequestException, ForbiddenException, Res} from '@nestjs/common';
import { PrismaClient, nguoi_dung } from '@prisma/client';
import { LoginType, SignUpType } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { UserLoginDto, UserSignUpDto } from './dto/auth.dto';
import { ApiResponse } from '@nestjs/swagger';
import { promises } from 'dns';
import { FileInterceptor } from '@nestjs/platform-express';
import { json } from 'stream/consumers';
import { of } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

export let token:string=""
@Injectable()
export class AuthService {
 model =new PrismaClient()
 constructor(

  private jwtService: JwtService
) { }
 async login(body:LoginType){
  let {email,mat_khau}=body
  let checkEmail=await this.model.nguoi_dung.findFirst({
    where:{
      email
    }
  })
 
  if(checkEmail!==null){
    const saltOrRounds = 10;
    const password = checkEmail.mat_khau;
    const hash = await bcrypt.hash(password, saltOrRounds)
    let checkPass= await bcrypt.compare(mat_khau,hash)
    console.log(checkPass)
    if(checkPass){
     token = this.jwtService.sign({ data: checkEmail }, { expiresIn: "120m", secret: "SangCao" });

      return {
        "statusCode":200,
        "message":"Thành công",
        "content":{
          "id":checkEmail.nguoi_dung_id,
          "hoten":checkEmail.ho_ten,
          "email":checkEmail.email,
          "matkhau":checkEmail.mat_khau,
          "tuoi":checkEmail.tuoi,
          "avatar":checkEmail.anh_dai_dien,
          "token":token
        }
      }

    }
   
    else{
      throw new BadRequestException({status:400,message: "Yêu cầu không hợp lệ!",content:'Sai mật khẩu hoặc tên đăng nhập',dateTime:new Date()})

    }
   
  }
  else{
    throw new BadRequestException({status:400,message: "Yêu cầu không hợp lệ!",content:'Email không tồn tại',dateTime:new Date()})
  }
 }

 async signup(body:SignUpType,img:any){
 
    let {email,mat_khau,ho_ten,tuoi,anh_dai_dien}=body

    let checkEmail= await this.model.nguoi_dung.findFirst({
      where:{
        email
      }
    })
    console.log(checkEmail)
    if(checkEmail){
     
     throw new BadRequestException({status:400,message: "Yêu cầu không hợp lệ!",content:'Email đã tồn tại',dateTime:new Date()})

    }
    else{
        const createUser=await this.model.nguoi_dung.create({
        data: {
          email,
          mat_khau,
          tuoi:Number(tuoi),
          anh_dai_dien:"localhost:8080/public/img/"+img,
          ho_ten
        },
       
      })
      return [{
        "statusCode":200,
        "message":"Đăng nhập thành công",
        "content":{
          "id":(await createUser).nguoi_dung_id,
          "hoten":(await createUser).ho_ten,
          "email":(await createUser).email,
          "matkhau":(await createUser).mat_khau,
          "tuoi":(await createUser).tuoi,
          "avatar":(await createUser).anh_dai_dien
        }
      }]
    }
   

     }
    
 

 


}
