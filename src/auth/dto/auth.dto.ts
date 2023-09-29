
import { UseInterceptors } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";


export class UserSignUpDto{
  @ApiProperty()
  email:string
  @ApiProperty()
  mat_khau:string
  @ApiProperty()
  ho_ten:string
  @ApiProperty()
  tuoi:number

  @ApiProperty({ type: 'string', format: 'binary' })
  
  anh_dai_dien:any
}

export class UserLoginDto {
    @ApiProperty()
    email: string
    
    @ApiProperty()
    mat_khau: string
}