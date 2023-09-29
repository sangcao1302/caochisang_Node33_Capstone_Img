import { ApiProperty } from "@nestjs/swagger"

export class UserPostDto {
    @ApiProperty()
    ten_hinh:string
    @ApiProperty({ type: 'string', format: 'binary' })
    duong_dan:any
    @ApiProperty()
    mo_ta:string
    @ApiProperty()
    nguoi_dung_id:number
}

export class UserInfo{
    @ApiProperty()
    nguoi_dung_id:number
    @ApiProperty()
    email:string
    @ApiProperty()
    mat_khau:string
    @ApiProperty()
    ho_ten:string
    @ApiProperty()
    tuoi:number
    @ApiProperty({type:"string",format:"binary"})
    anh_dai_dien:any
}

