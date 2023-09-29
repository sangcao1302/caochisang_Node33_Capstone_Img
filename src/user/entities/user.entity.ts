export type UserPost ={
    hinh_id:number,
    ten_hinh:string,
    duong_dan:string,
    mo_ta:string,
    nguoi_dung_id:number
}

export type UserInfo={
    nguoi_dung_id:number,
    email:string,
    mat_khau:string,
    ho_ten:string,
    tuoi:number,
    anh_dai_dien:any
}
export type SaveImage={
    nguoi_dung_id:number,
    hinh_id:number,
    ngay_luu:Date
}
export declare type userSaveImage={
    nguoi_dung_id:number
    hinh_id:number
    ngay_luu:Date
}