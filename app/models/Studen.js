import Person from "./Person";

export default class Studen extends Person{
    constructor(id,hoten,diachi,email,toan,ly,hoa,chucvu,dtb){
    this.toan = toan;
    this.ly = ly;
    this.hoa = hoa;
    this.chucvu = chucvu;
    dtb = 0;  
    }
    DTB(){
        this.dtb = (this.toan + this.ly + this.ly)/3;
    }
}