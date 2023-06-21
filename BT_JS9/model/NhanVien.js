function NhanVien(_account,_name,_email,_password,_dayWork,_basicSalary,_position,_hourWorkInMonth){
    this.account = _account
    this.name = _name
    this.email = _email
    this.password = _password
    this.dayWork = _dayWork
    this.basicSalary = _basicSalary
    this.positon = _position
    this.hourWorkInMonth = _hourWorkInMonth
    this.totalSalary = function(){
        if(this.positon === "Sếp"){
            return this.basicSalary * 3 
        } else if (this.positon === "Trưởng phòng"){
            return this.basicSalary * 2
        } else {
            return this.basicSalary * 1
        }
    }
    this.typeOfEmployee = function(){
        if(this.positon === "Nhân viên"){
            if(this.hourWorkInMonth >= 192){
                return "Nhân viên Xuất Sắc"
            } else if(this.hourWorkInMonth >= 176){
                return "Nhân viên Giỏi"
            } else if(this.hourWorkInMonth >= 160){
                return "Nhân viên Khá"
            } else {
                return "Nhân viên Trung Bình"
            }
        } else {
            return ""
        }
    }
}