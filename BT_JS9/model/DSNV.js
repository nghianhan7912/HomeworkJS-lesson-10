function DSNV(){
    // Tạo mảng để push
    this.arrNV = []
    // Xử lý thêm NV
    this.themNV = function(nhanVien){
        this.arrNV.push(nhanVien)
    }
    // Xử lý tìm NV
    this.timNV = function(accountNV){
        for(var i =0 ; i< this.arrNV.length;i++){
            var tkNV = this.arrNV[i].account
            if(tkNV === accountNV){
                return i
            }
        }
        return -1
    }
    // Xử lý xoá NV
    this.xoaNV = function(accountNV){
        var index = this.timNV(accountNV)
        if(index !== -1){
            this.arrNV.splice(index,1)
        } else {
            alert ("Vui lòng nhập lại tài khoản")
        }
    }
    // Xử lý cập nhật NV
    this.capnhatNV = function(nhanVien){
        var index = this.timNV(nhanVien.account)
        if(index !== -1){
            this.arrNV[index] = nhanVien
        }
    }
}