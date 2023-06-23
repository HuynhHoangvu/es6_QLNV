import Customer from "../model/Customer.js";
import Employee from "../model/Employee.js";
import ListPerson from "../model/ListPerson.js";
import Person from "../model/Person.js";
import Student from "../model/Student.js";

const listPerson = new ListPerson();
const person = new Person();
const getEle = (id) => document.getElementById(id);

let nextId = 1;
function getPerson() {
    console.log(statedef)
    let hoten = getEle('hoten').value;
    let diachi = getEle('diachi').value;
    let email = getEle('email').value;

    let id = nextId++;
    if (statedef == 'Customer') {
        let tenct = getEle('tenct').value
        let trigia = getEle('trigia').value * 1
        let danhgia = getEle('danhgia').value
        let chucvu = statedef
        const customer = new Customer(id, hoten, diachi, email, tenct, trigia, danhgia, chucvu);
        console.log(customer);
        return customer;

    }
    if (statedef == 'Student') {
        let chucvu = statedef
        let toan = getEle('toan').value * 1
        let ly = getEle('ly').value * 1
        let hoa = getEle('hoa').value * 1
        const student = new Student(id, hoten, diachi, email, toan, ly, hoa, chucvu)
        console.log(student);
        student.tinhDTB();
        return student;

    }
    if (statedef == 'Employee') {
        let chucvu = statedef
        let ngaylamviec = getEle('ngaylamviec').value * 1
        let luongtheongay = getEle('luongtheongay').value * 1
        const employee = new Employee(id, hoten, diachi, email, chucvu, ngaylamviec, luongtheongay)
        console.log(employee)
        employee.tinhLuong();
        return employee;
    }
}
window.filterByLoai = () => {
    const filterLoai = getEle("filterLoai").value;
    renderPerson(listPerson.arr, filterLoai);
}

window.btnSort = () => {
    let mangTheoChuCai = listPerson.sortAZ()
    renderPerson(mangTheoChuCai)
}

function renderPerson(data, filterLoai) {
    let content = ""; // Accumulate the content outside the loop
    for (let i = 0; i < data.length; i++) {
        let eachperson = data[i];
        let luong = eachperson.luong !== undefined ? eachperson.luong : "";

        if (filterLoai && eachperson.chucvu !== filterLoai) {
            continue;
        }

        let dtb = eachperson.dtb || "";
        content += `
      <tr>
        <td>${eachperson.hoten}</td>
        <td>${eachperson.diachi}</td>
        <td>${eachperson.email}</td>
        <td>${eachperson.chucvu}</td>
        <td>${luong}</td>
        <td>${dtb}</td>
        <td>
        <button class="btn btn-info" onclick="btnShowEditPanel('${eachperson.id}')">Edit</button>
        <button class="btn btn-danger" onclick="btnDelete('${eachperson.id}')">Delete</button></td>
      </tr>
    `;
    }
    getEle('tblManager').innerHTML = content; // Set the content after the loop
}


let statedef = "";
window.showMoreOption = (value) => {

    if (value.length != 0) {

        if (value == "Customer") {
            statedef = "Customer";
            getEle("hiddenCustomer").style.display = "block";
            getEle("hiddenStudent").style.display = "none";
            getEle("hiddenEmployee").style.display = "none";
        } else if (value == "Student") {
            statedef = "Student";
            getEle("hiddenCustomer").style.display = "none";
            getEle("hiddenStudent").style.display = "block";
            getEle("hiddenEmployee").style.display = "none";
        } else if (value == "Employee") {
            statedef = "Employee";
            getEle("hiddenCustomer").style.display = "none";
            getEle("hiddenStudent").style.display = "none";
            getEle("hiddenEmployee").style.display = "block";
        }
    } else {
        getEle("hiddenEmployee").style.display = "none";
        getEle("hiddenCustomer").style.display = "none";
        getEle("hiddenStudent").style.display = "none";
        statedef = "";
    }
};

// Button: Show Edit Form
window.btnShowEditPanel = (id) => {
    $("#modelId").modal("show");
    getEle('editBtn').style.display = 'block';
    getEle("editBtn").setAttribute("value", id);
    getEle('addBtn').style.display = 'none';

    let personEdit = listPerson.findPersonId(id);

    getEle("hoten").value = personEdit.hoten;
    getEle("diachi").value = personEdit.diachi;
    getEle("email").value = personEdit.email;

    if (personEdit.chucvu === "Customer") {
        getEle("hiddenCustomer").style.display = "block";
        getEle("hiddenEmployee").style.display = "none";
        getEle("hiddenStudent").style.display = "none";
        getEle("tenct").value = personEdit.tenct;
        getEle("trigia").value = personEdit.trigia;
        getEle("danhgia").value = personEdit.danhgia;
        getEle('loai').value = personEdit.chucvu
        statedef = "Customer"

    } if (personEdit.chucvu === "Student") {
        getEle("hiddenStudent").style.display = "block";
        getEle("hiddenCustomer").style.display = "none";
        getEle("hiddenEmployee").style.display = "none";
        getEle("toan").value = personEdit.toan;
        getEle("ly").value = personEdit.ly;
        getEle('loai').value = personEdit.chucvu
        getEle("hoa").value = personEdit.hoa;
        statedef = "Student"

    } if (personEdit.chucvu === "Employee") {
        getEle("hiddenEmployee").style.display = "block";
        getEle("hiddenCustomer").style.display = "none";
        getEle("hiddenStudent").style.display = "none";
        getEle("luongtheongay").value = personEdit.luongtheongay;
        getEle('loai').value = personEdit.chucvu
        getEle("ngaylamviec").value = personEdit.songaylamviec;
        statedef = "Employee"

    }
    getEle("loai").disabled = true;

};

// Button: Edit
window.editBtn = (value) => {
    const id = value;
    const personEdit = listPerson.findPersonId(id);
    personEdit.hoten = getEle("hoten").value;
    personEdit.diachi = getEle("diachi").value;
    personEdit.email = getEle("email").value;

    if (personEdit.chucvu === "Customer") {
        personEdit.tenct = getEle("tenct").value;
        personEdit.trigia = getEle("trigia").value;
        personEdit.danhgia = getEle("danhgia").value;
        personEdit.chucvu = getEle("loai").value;
        getEle("editBtn").style.display = "none";

    } else if (personEdit.chucvu === "Student") {
        personEdit.toan = getEle("toan").value * 1;
        personEdit.ly = getEle("ly").value * 1;
        personEdit.hoa = getEle("hoa").value * 1;
        personEdit.chucvu = getEle("loai").value;
        personEdit.dtb = (personEdit.toan + personEdit.ly + personEdit.hoa) / 3
        personEdit.luong = ""
        getEle("editBtn").style.display = "none";


    } else if (personEdit.chucvu === "Employee") {
        personEdit.luongtheongay = getEle("luongtheongay").value;
        personEdit.songaylamviec = getEle("ngaylamviec").value;
        personEdit.chucvu = getEle("loai").value;
        personEdit.luong = personEdit.luongtheongay * personEdit.songaylamviec
        personEdit.dtb = ""
        getEle("editBtn").style.display = "none";

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
    reset()
};

window.btnShowAdd = () => {
    reset();
    getEle('editBtn').style.display = 'none';
    getEle('addBtn').style.display = 'block';
    getEle("loai").disabled = false;

}

function reset() {
    getEle('hoten').value = "";
    getEle('diachi').value = "";
    getEle('email').value = "";

    getEle('toan').value = "";
    getEle('ly').value = "";
    getEle('hoa').value = "";

    getEle('tenct').value = "";
    getEle('trigia').value = "";
    getEle('danhgia').value = "";

    getEle('luongtheongay').value = "";
    getEle('ngaylamviec').value = "";

    getEle('loai').value = ""

    getEle('hiddenEmployee').style.display = 'none';
    getEle('hiddenCustomer').style.display = 'none';
    getEle('hiddenStudent').style.display = 'none';
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