import Person from "./Person";
export default class Employee extends Person{
    constructor(id,name,address,chucvu,ngaylam,luongtheongay,luong){
        super(id,name,address,this.email);
        this.chucvu = chucvu;
        this.ngaylam = ngaylam;
        this.luongtheongay = luongtheongay;
        luong = 0;
    }
    tinhLuong(){
        this.luong = this.ngaylam * this.luongtheongay
    }
}