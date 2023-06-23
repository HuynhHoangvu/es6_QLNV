import Person from "./Person";

export default class Customer extends Person{
    constructor(id,name,address,email,cty,trigia,danhgia,chucvu){
        super(id,name,address,email);
        this.cty = cty;
        this.trigia = trigia;
        this.danhgia = danhgia;
        this.chucvu = chucvu;
    }
}