function getElement(Selection) {
    return document.querySelector(Selection)
}
var dsnv = new DSNV()
getLocal()
// Viết hoa chữ cái đầu
function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Lấy Thông tin
function getInforEmployee(isEdit) {
    var account = getElement("#tknv").value
    var name = getElement("#name").value
    var email = getElement("#email").value
    var password = getElement("#password").value
    var dayWork = getElement("#datepicker").value
    var basicSalary = getElement("#luongCB").value * 1
    var positon = getElement("#chucvu").value
    var hourWork = getElement("#gioLam").value * 1
    var nhanVien = new NhanVien(account, name, email, password, dayWork, basicSalary, positon, hourWork)
    var isValid = true
    isValid &= checkAccount(nhanVien.account, dsnv.arrNV, isEdit, "#tbTKNV", "Tài khoản đã tồn tại")
    console.log(nhanVien);
    return isValid ? nhanVien : undefined;
}
// Check Validation
function checkValidation() {
    var nhanVien = getInforEmployee()
    var checkAccount = vlAccount(nhanVien.account, "#tbTKNV")
    var checkName = vlName(nhanVien.name, "#tbTen")
    var checkEmail = vlEmail(nhanVien.email, "#tbEmail")
    var checkPassword = vlPassword(nhanVien.password, "#tbMatKhau")
    var checkDay = vlDay(nhanVien.dayWork, "#tbNgay")
    var checkSalary = vlSalary(nhanVien.basicSalary, "#tbLuongCB")
    var checkPosition = vlPosition(nhanVien.positon, "#tbChucVu")
    var checkHour = vlHour(nhanVien.hourWorkInMonth, "#tbGiolam")
    if (checkAccount && checkName && checkEmail && checkPassword && checkDay && checkSalary && checkPosition && checkHour) {
        return true
    } else {
        return false
    }
}
getElement("#btnThem").onclick = function(){
    getElement("#btnCapNhat").disabled = true
    getElement("#btnThemNV").disabled = false

}
// Thêm NV
getElement("#btnThemNV").onclick = function () {
    var nhanVien = getInforEmployee(false)
    var check = checkValidation()
    if (check) {
        dsnv.themNV(nhanVien)
        renderDSNV()
        setLocal()
        getElement("#formQLNV").reset()
        return true
    } else {
        return false
    }
}

// Reset form khi đóng form
getElement("#btnDong").onclick = function () {
    getElement("#formQLNV").reset()
}
// In ra màn hình
function renderDSNV(arrNV = dsnv.arrNV) {
    var content = ""
    for (var i = 0; i < arrNV.length; i++) {
        var nv = arrNV[i]
        content += `<tr>
        <td>${nv.account}</td>
        <td>${nv.name}</td>
        <td>${nv.email}</td>
        <td>${nv.dayWork}</td>
        <td>${nv.positon}</td>
        <td>${nv.totalSalary()}</td>
        <td>${nv.typeOfEmployee()}</td>
        <td>
        <button class = "btn btn-success" onclick="updateNV('${nv.account}')" data-toggle="modal"
        data-target="#myModal">Edit</button>
        <button class = "btn btn-danger" onclick="deleteNV('${nv.account}')">Delete</button>
        </td>
        </tr>
        `
    }
    getElement("#tableDanhSach").innerHTML = content
}
// Lưu dsnv vào local
function setLocal() {
    var data = JSON.stringify(dsnv.arrNV)
    localStorage.setItem("dsnv", data)
}
// Lấy dsnv từ local
function getLocal() {
    var data = localStorage.getItem("dsnv")
    if (data) {
        var parseData = JSON.parse(data)
        var arr = []
        for (var i = 0; i < parseData.length; i++) {
            var nv = parseData[i]
            var nhanVien = new NhanVien(nv.account, nv.name, nv.email, nv.password, nv.dayWork, nv.basicSalary, nv.positon, nv.hourWork)
            arr.push(nhanVien)
        }
        dsnv.arrNV = arr
        renderDSNV()
    }
}
// Xoá Nhân viên
function deleteNV(accountNV) {
    dsnv.xoaNV(accountNV)
    renderDSNV()
    setLocal()
}
// Cập nhật Nhân Viên
function updateNV(accountNV) {
    var index = dsnv.timNV(accountNV)
    var nv = dsnv.arrNV[index]
    getElement("#tknv").value = nv.account
    getElement("#name").value = nv.name
    getElement("#email").value = nv.email
    getElement("#password").value = nv.password
    getElement("#datepicker").value = nv.dayWork
    getElement("#luongCB").value = nv.basicSalary
    getElement("#chucvu").value = nv.positon
    getElement("#gioLam").value = nv.hourWorkInMonth
    getElement("#btnCapNhat").disabled = false
    getElement("#btnThemNV").disabled = true
}
getElement("#btnCapNhat").onclick = function () {
    var nhanVien = getInforEmployee(true)
    dsnv.capnhatNV(nhanVien)
    renderDSNV()
    setLocal()
    getElement("#formQLNV").reset()
}
// Validation Account
function vlAccount(account, idThongbao) {
    account = account.replace(/\s/g, "");
    if (account === "") {
        getElement(idThongbao).innerHTML = "Account không được bỏ trống"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else if (account.trim().length < 4) {
        getElement(idThongbao).innerHTML = "Account không được nhỏ hơn 4 kí tự"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else if (account.trim().length > 6) {
        getElement(idThongbao).innerHTML = "Account không được lớn hơn 6 kí tự"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else {
        getElement(idThongbao).style.display = "none"
        return true
    }
}
// Validation name 
function vlName(name, idThongbao) {
    var regexLetter = new RegExp(/^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]*)*$/gm);
    name = name.toUpperCase().trim()
    if (name === "") {
        getElement(idThongbao).innerHTML = "Name không được bỏ trống"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else if (regexLetter.test(name) === false) {
        getElement(idThongbao).innerHTML = "Name không được chứa kí tự số"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else {
        getElement(idThongbao).style.display = "none"
        return true
    }
}
// Validation email
function vlEmail(email, idThongbao) {
    var regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    if (email === "") {
        getElement(idThongbao).innerHTML = "Email không được bỏ trống"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else if (regexEmail.test(email) === false) {
        getElement(idThongbao).innerHTML = "Email không đúng"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else {
        getElement(idThongbao).style.display = "none"
        return true
    }
}
// Validation password
function vlPassword(password, idThongbao) {
    var regexPassword = new RegExp(/^(?=.{6,10})(?=.*[a-z]+)(?=.*\d+)(?=.*[A-Z]+)(?=.*[^\w])[ -~]+$/)
    if (password === "") {
        getElement(idThongbao).innerHTML = "Passwork không được bỏ trống"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else if (regexPassword.test(password) === false) {
        getElement(idThongbao).innerHTML = "Passwork từ 6-10 kí tự và chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else {
        getElement(idThongbao).style.display = "none"
        return true
    }
}
// Validation day
function vlDay(dayWork, idThongbao) {
    var regexDay = new RegExp(/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/)
    if (regexDay.test(dayWork) === false) {
        getElement(idThongbao).innerHTML = "Vui lòng nhập đúng định dạng mm-dd-yyyy"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else if (dayWork === "") {
        getElement(idThongbao).innerHTML = "Ngày tháng không được bỏ trống"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else {
        getElement(idThongbao).style.display = "none"
        return true
    }
}
// Validation Salary
function vlSalary(salary, idThongbao) {
    if (salary === 0) {
        getElement(idThongbao).innerHTML = "Vui lòng nhập tiền lương"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else if (salary < 1e6 || salary > 20e6) {
        getElement(idThongbao).innerHTML = "Lương chỉ từ 1.000.000 tới 20.000.000 thôi ông thần"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else {
        getElement(idThongbao).style.display = "none"
        return true
    }
}
// Validation Position
function vlPosition(positon, idThongbao) {
    if (positon !== "Sếp" && positon !== "Trưởng phòng" && positon !== "Nhân viên") {
        getElement(idThongbao).innerHTML = "Vui lòng chọn chức vụ"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else {
        getElement(idThongbao).style.display = "none"
        return true
    }
}
// Validation HourInMonth
function vlHour(hour, idThongbao) {
    console.log(hour);
    if (hour === 0) {
        getElement(idThongbao).innerHTML = "Vui lòng nhập giờ làm"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else if (hour < 80 || hour > 200) {
        getElement(idThongbao).innerHTML = "Giờ làm chỉ trong khoảng 80-200 giờ"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else {
        getElement(idThongbao).style.display = "none"
        return true
    }
}

// Check Tài khoản
function checkAccount(account, dsnv, isEdit, selector, messErr) {
    if (isEdit) return true
    var isFlag = true
    for (var i = 0; i < dsnv.length; i++) {
        if (dsnv[i].account === account) {
            isFlag = false
            break
        }
    }
    if (!isFlag) {
        getElement(selector).innerHTML = messErr
        getElement(selector).style.display = "inline-block"
        return false
    } else {
        getElement(selector).style.display = "none"
        return true
    }
}
// Search Loại nhân viên
getElement("#searchName").addEventListener("keyup", function () {
    var valueSearch = getElement("#searchName").value.toLowerCase()
    var arrSearch = []
    for (var i = 0; i < dsnv.arrNV.length; i++) {
        var typeNV = dsnv.arrNV[i].typeOfEmployee().toLowerCase()
        if (typeNV.indexOf(valueSearch) !== -1) {
            arrSearch.push(dsnv.arrNV[i])
        }
    }
    renderDSNV(arrSearch)
})