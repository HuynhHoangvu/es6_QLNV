import Person from "./Person.js";
export default class Employee extends Person{
    constructor(id,name,address,email,chucvu,ngaylam,luongtheongay,luong){
        super(id,name,address,email);
        this.chucvu = chucvu;
        this.ngaylam = ngaylam;
        this.luongtheongay = luongtheongay;
        luong = 0;
    }
    tinhLuong(){
        this.luong = this.ngaylam * this.luongtheongay
        console.log(this.luong);
    }
}