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
    var isValid = true
    var account = getElement("#tknv").value
    var name = getElement("#name").value
    var email = getElement("#email").value
    var password = getElement("#password").value
    var dayWork = getElement("#datepicker").value
    var basicSalary = getElement("#luongCB").value * 1
    var positon = getElement("#chucvu").value
    var hourWork = getElement("#gioLam").value * 1
    var nhanVien = new NhanVien(account, name, email, password, dayWork, basicSalary, positon, hourWork)
    console.log(nhanVien.account);
    isValid &= vlAccount(nhanVien.account, "#tbTKNV") && checkAccount(nhanVien.account, dsnv.arrNV, isEdit, "#tbTKNV", "Tài khoản đã tồn tại")
    console.log(isValid)
    isValid &= vlName(nhanVien.name, "#tbTen")
    isValid &= vlEmail(nhanVien.email, "#tbEmail")
    isValid &= vlPassword(nhanVien.password, "#tbMatKhau")
    isValid &= vlDay(nhanVien.dayWork, "#tbNgay")
    isValid &= vlSalary(nhanVien.basicSalary, "#tbLuongCB")
    isValid &= vlPosition(nhanVien.positon, "#tbChucVu")
    isValid &= vlHour(nhanVien.hourWorkInMonth, "#tbGiolam")
    console.log(isValid);
    return isValid ? nhanVien : undefined;
}
// Check Validation
// function checkValidation() {
//     var nhanVien = getInforEmployee()
//     var checkAccount = vlAccount(nhanVien.account, "#tbTKNV")
//     var checkName = vlName(nhanVien.name, "#tbTen")
//     var checkEmail = vlEmail(nhanVien.email, "#tbEmail")
//     var checkPassword = vlPassword(nhanVien.password, "#tbMatKhau")
//     var checkDay = vlDay(nhanVien.dayWork, "#tbNgay")
//     var checkSalary = vlSalary(nhanVien.basicSalary, "#tbLuongCB")
//     var checkPosition = vlPosition(nhanVien.positon, "#tbChucVu")
//     var checkHour = vlHour(nhanVien.hourWorkInMonth, "#tbGiolam")
//     if (checkAccount && checkName && checkEmail && checkPassword && checkDay && checkSalary && checkPosition && checkHour) {
//         return true
//     } else {
//         return false
//     }

// }
getElement("#btnThem").onclick = function () {
    getElement("#btnCapNhat").disabled = true
    getElement("#btnThemNV").disabled = false
    getElement("#formQLNV").reset()
    clearSpan()
}
// Thêm NV
getElement("#btnThemNV").onclick = function () {
    var nhanVien = getInforEmployee(false)
    if (nhanVien) {
        dsnv.themNV(nhanVien)
        renderDSNV()
        setLocal()
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
    clearSpan()
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
