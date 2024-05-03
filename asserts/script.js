//nav bar
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarLinks = document.querySelector('.navbar-links');
const themeIcon = document.getElementById('theme-icon');
let darkMode = false;

themeIcon.addEventListener('click', () => {
    darkMode = !darkMode;
    updateTheme();
});

function updateTheme() {
    if (darkMode) {
        
        document.body.classList.add('dark-mode');
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
        themeIcon.innerHTML = '<i class="bi bi-moon"></i>';
       
    } else {
        document.body.classList.remove('dark-mode');
        document.body.style.backgroundColor = '#f0f0f0';
        document.body.style.color = '#000';
        themeIcon.innerHTML = '<i class="bi bi-sun"></i>';
      
    }
}

var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Details"
    isEdit = false
    imgInput.src = "./images/formimg.png"
    form.reset()
})

file.onchange = function(){
    if(file.files[0].size < 1000000){
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large")
    }
}

function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.startDate}</td>

            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}',  '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}',  '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`
        userInfo.innerHTML += createElement
    })
}
showInfo()
function readInfo(pic, name, age, city, email, phone, post, sDate){
    document.querySelector('.showImg').src = pic,
    document.querySelector('#showName').value = name,
    document.querySelector("#showCity").value = city,
    document.querySelector("#showEmail").value = email,
    document.querySelector("#showPhone").value = phone,
    document.querySelector("#showsDate").value = sDate
}

function editInfo(index, pic, name,  City, Email, Phone,  Sdate){
    isEdit = true
    editId = index
    imgInput.src = pic
    userName.value = name
    city.value =City
    email.value = Email,
    phone.value = Phone,
    sDate.value = Sdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}

function deleteInfo(index){
    if(confirm("do you want to delete this contact ?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}

form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "./images/formimg.png" : imgInput.src,
        employeeName: userName.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        startDate: sDate.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "images/Profile Icon.webp"  
})