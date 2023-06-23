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
    var regexDay = new RegExp(/(?:(?:(?:0[1-9]|1[0-2])\/(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])\/(?:29|30)|(?:0[13578]|1[02])\/31)\/[1-9]\d{3}|02\/29(?:\/[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00))/)
    if (regexDay.test(dayWork) === false) {
        getElement(idThongbao).innerHTML = "Định dạng ngày không đúng"
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
    var regexSalary = new RegExp(/^[0-9]+$/)
    if (salary === 0) {
        getElement(idThongbao).innerHTML = "Vui lòng nhập tiền lương"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else if (salary < 1e6 || salary > 20e6) {
        getElement(idThongbao).innerHTML = "Lương chỉ từ 1.000.000 tới 20.000.000 thôi ông thần"
        getElement(idThongbao).style.display = "inline-block"
        return false
    } else if(regexSalary.test(salary) === false){
        getElement(idThongbao).innerHTML = "Vui lòng nhập số nguyên và không chứa kí tự đặc biệt"
        getElement(idThongbao).style.display = "inline-block"
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
// Clear span
function clearSpan(){
    getElement("#tbTKNV").style.display = "none"
    getElement("#tbTen").style.display = "none"
    getElement("#tbEmail").style.display = "none"
    getElement("#tbMatKhau").style.display = "none"
    getElement("#tbNgay").style.display = "none"
    getElement("#tbLuongCB").style.display = "none"
    getElement("#tbChucVu").style.display = "none"
    getElement("#tbGiolam").style.display = "none"
}