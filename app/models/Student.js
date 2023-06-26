import Person from "./Person.js";
export default class Student extends Person{
    constructor(id,name,address,email,toan,ly,hoa,chucvu,dtb){
    super(id,name,address,email)
    this.toan = toan;
    this.ly = ly;
    this.hoa = hoa;
    this.chucvu = chucvu;
    dtb = 0;  
    }
    tinhDTB(){
        this.dtb = (this.toan + this.ly + this.ly)/3;
        console.log(this.dtb)
    }
}