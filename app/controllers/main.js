import Customer from "../models/Customer.js";
import Employee from "../models/Employee.js";
import ListPerson from "../models/ListPerson.js";
import Person from "../models/Person.js";
import Student from "../models/Student.js";

const listPerson = new ListPerson();
const person = new Person();
const getE = (id) => document.getElementById(id);

let Id = 1;
function getPerson(){
    let name = getE("name").value;
    let address = getE("address").value;
    let email = getE("email").value;
    let id = Id++;
    if(vla == 'Customer'){
        let cty = getE('cty').value;
        let trigia = getE('hoaDon').value *1;
        let danhgia = getE('rate').value;
        let chucvu = vla;
        const customer = new Customer(id,name,address,email,cty,trigia,danhgia,chucvu);
        console.log(customer);
        return customer;
    }
    if(vla == 'Student'){
        let chucvu = vla;
        let toan = getE('toan').value *1;
        let ly = getE('ly').value *1;
        let hoa = getE('hoa').value*1;
        const student = new Student(id,name,address,email,toan,ly,hoa,chucvu);
        console.log(student);
        student.tinhDTB();
        return student;
    }
    if(vla == 'Employee'){
        let chucvu = vla;
        let ngaylam= getE('ngayLam').value *1;
        let luongtheongay = getE('luongngay').value *1;
        const employee = new Employee(id,name,address,email,chucvu,ngaylam,luongtheongay);
        console.log(employee);
        employee.tinhLuong();
        return employee;
    }
}
window.filterByLoai = () =>{
    const filterLoai = getE("filterLoai").value;
    renderPerson(listPerson.arr,filterLoai);
}
window.btnSort = () => {
    let mangTheoChuCai = listPerson.sortAZ()
    renderPerson(mangTheoChuCai)
}
function renderPerson(data,filterLoai){
    let content = "";
    for(let i = 0; i <data.length;i++){
        let eachperson = data[i];
        let luong = eachperson.luong !== undefined ? eachperson.luong : "";
        if(filterLoai && eachperson.chucvu !== filterLoai){
            continue;
        }
        let dtb = eachperson.dtb|| "";
        let cty = eachperson.cty !== undefined ? eachperson.cty : "";
        let hoaDon = eachperson.hoaDon !== undefined ? eachperson.hoaDon : "";
        let rate = eachperson.rate !== undefined ? eachperson.rate : "";
        content +=
       ` <tr>
            <td>${eachperson.name}</td>
            <td>${eachperson.address}</td>
            <td>${eachperson.email}</td>
            <td>${eachperson.chucvu}</td>
            <td>${dtb}</td>
            <td>${luong}</td>
            <td>${cty}</td>
            <td>${hoaDon}</td>
            <td>${rate}</td>
            <td>
        <button class="btn btn-info" onclick="btnShowEditPanel('${eachperson.id}')">Edit</button>
        <button class="btn btn-danger" onclick="btnDelete('${eachperson.id}')">Delete</button></td>
        </tr>`
    }
    getE('tbodyFood').innerHTML = content;
}
let vla = "";
window.showMoreOption = (value) =>{
    if(value.length != 0){
        if(value == "Customer"){
            vla = "Customer";
            getE("hiddenCustomer").style.display = "block";
            getE("hiddenStudent").style.display = "none";
            getE("hiddenEmployee").style.display = "none";
        }
        else if( value == "Student"){
            vla = "Student";
            getE("hiddenCustomer").style.display = "none";
            getE("hiddenStudent").style.display = "block";
            getE("hiddenEmployee").style.display = "none";
        }
        else if(value == "Employee"){
            vla = "Employee";
            getE("hiddenCustomer").style.display = "none";
            getE("hiddenStudent").style.display = "none";
            getE("hiddenEmployee").style.display = "block";
        }
         }else{
            getE("hiddenCustomer").style.display = "none";
            getE("hiddenStudent").style.display = "none";
            getE("hiddenEmployee").style.display = "none"; 
            vla="";
       
    }
};
// Button: Show Edit Form
window.btnShowEditPanel = (id) => {
    $("#modelId").modal("show");
    getE('editBtn').style.display = 'block';
    getE("editBtn").setAttribute("value", id);
    getE('addBtn').style.display = 'none';

    let personEdit = listPerson.findPersonId(id);

    getE("hoten").value = personEdit.hoten;
    getE("diachi").value = personEdit.diachi;
    getE("email").value = personEdit.email;

    if (personEdit.chucvu === "Customer") {
        getE("hiddenCustomer").style.display = "block";
        getE("hiddenEmployee").style.display = "none";
        getE("hiddenStudent").style.display = "none";
        getE("tenct").value = personEdit.tenct;
        getE("trigia").value = personEdit.trigia;
        getE("danhgia").value = personEdit.danhgia;
        getE('loai').value = personEdit.chucvu
        statedef = "Customer"

    } if (personEdit.chucvu === "Student") {
        getE("hiddenStudent").style.display = "block";
        getE("hiddenCustomer").style.display = "none";
        getE("hiddenEmployee").style.display = "none";
        getE("toan").value = personEdit.toan;
        getE("ly").value = personEdit.ly;
        getE('loai').value = personEdit.chucvu
        getE("hoa").value = personEdit.hoa;
        statedef = "Student"

    } if (personEdit.chucvu === "Employee") {
        getE("hiddenEmployee").style.display = "block";
        getE("hiddenCustomer").style.display = "none";
        getE("hiddenStudent").style.display = "none";
        getE("luongngay").value = personEdit.luongtheongay;
        getE('loai').value = personEdit.chucvu
        getE("ngaylamviec").value = personEdit.songaylamviec;
        statedef = "Employee"

    }
    getE("loai").disabled=true;  

};

// Button: Edit
window.editBtn = (value) => {
    const id = value;
    const personEdit = listPerson.findPersonId(id);
    personEdit.hoten = getE("name").value;
    personEdit.diachi = getE("address").value;
    personEdit.email = getE("email").value;

    if (personEdit.chucvu === "Customer") {
        personEdit.tenct = getE("cty").value;
        personEdit.trigia = getE("trigia").value;
        personEdit.danhgia = getE("rate").value;
        personEdit.chucvu = getE("loai").value;
        getE("editBtn").style.display = "none";

    } else if (personEdit.chucvu === "Student") {
        personEdit.toan = getE("toan").value * 1;
        personEdit.ly = getE("ly").value * 1;
        personEdit.hoa = getE("hoa").value * 1;
        personEdit.chucvu = getE("loai").value;
        personEdit.dtb = (personEdit.toan + personEdit.ly + personEdit.hoa) / 3
        personEdit.luong = ""
        getE("editBtn").style.display = "none";


    } else if (personEdit.chucvu === "Employee") {
        personEdit.luongtheongay = getE("luongngay").value;
        personEdit.songaylamviec = getE("ngaylamviec").value;
        personEdit.chucvu = getE("loai").value;
        personEdit.luong = personEdit.luongtheongay * personEdit.songaylamviec
        personEdit.dtb = ""
        getE("editBtn").style.display = "none";

    }

    setLocalStorage();
    renderPerson(listPerson.arr);
    reset();
}
// Button: Delete
window.btnDelete = (id) => {
    listPerson.deletePerson(id)
    setLocalStorage();
    renderPerson(listPerson.arr);
}
// Button: Add
window.addBtn = () => {
    let person = getPerson()
    if (person) {
        listPerson.addToArr(person);
        setLocalStorage();
        renderPerson(listPerson.arr);
    } else {
        alert("Hãy điền thông tin đầy đủ")
    }
    reset();
   
};

window.btnShowAdd = () => {
    reset();
    getE('editBtn').style.display = 'none';
    getE('addBtn').style.display = 'block';
    getE("loai").disabled = false;

}

function reset() {
    getE('hoten').value = "";
    getE('diachi').value = "";
    getE('email').value = "";

    getE('toan').value = "";
    getE('ly').value = "";
    getE('hoa').value = "";

    getE('tenct').value = "";
    getE('trigia').value = "";
    getE('danhgia').value = "";

    getE('luongtheongay').value = "";
    getE('ngaylamviec').value = "";

    getE('loai').value = ""

    getE('hiddenEmployee').style.display = 'none';
    getE('hiddenCustomer').style.display = 'none';
    getE('hiddenStudent').style.display = 'none';
    statedef = ""

}

// LocalStorage
function setLocalStorage() {
    var dataString = JSON.stringify(listPerson.arr);
    localStorage.setItem("listPerson", dataString);
}

function getLocalStorage() {
    if (localStorage.getItem("listPerson")) {
        var dataString = localStorage.getItem("listPerson");
        listPerson.arr = JSON.parse(dataString);
        renderPerson(listPerson.arr);
        console.log(listPerson.arr);
    }
}

getLocalStorage();
