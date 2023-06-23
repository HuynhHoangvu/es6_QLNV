export default class ListPerson {
    constructor(){
        this.arr = [];
        this.Id = 1;
    }
    findPersonId(id){
        return this.arr.fund((person)=>person.id == id)
    }
    addToArr(person){
        person.id = this.Id++;
        this.arr.push(person);
    }
    deletePerson(id){
        var personID = this.findPersonId(id);
        if(personID != -1){
            var personIndex= this.arr.indexOf(personID);
            this.arr.splice(personIndex,1);
            console.log(this.arr)
        }
    }
    arrange(){
        let arrABC = this.arr.sort((a,b)=>{
            let tenA = a.hoten.toLowerCase();
            let tenB = b.hoten.toLowerCase();

            if(tenA < tenB) return -1;

            else if(tenA > tenB) return 1;

            else return 0;
        })
        return arrABC;
    }
}