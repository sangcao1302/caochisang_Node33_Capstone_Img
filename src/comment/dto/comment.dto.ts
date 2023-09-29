import { ApiProperty } from "@nestjs/swagger"

export class Comment {
    @ApiProperty()
    nguoi_dung_id:number
    @ApiProperty()
    hinh_id:number
    @ApiProperty()
    ngay_binh_luan:Date
    @ApiProperty()
    noi_dung:string
}