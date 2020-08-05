//Khai báo svService tương tác api
var svService = new SinhVienService();

//------------------------ Giao tiếp với API thông qua axios ---------------------------

var getApiSinhVien = function() {
    var objectAPI = {
        url:'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien', // Đường dẫn đi đến file hoặc link backend cung cấp
        method: 'GET' //phương thức backend cung cấp
    }
    //Gửi yêu cầu dữ liệu đến backend => backend trả về promise
    var promise = axios(objectAPI);

    //Xử lý thành công
    var funcSuccess = function (result) {
        renderTableSinhVien(result.data);
    }

    //Xử lý thất bại
    var funcFail = function (error) {
        console.log(error);
    }

    //then(): Hàm nhận vào giá trị là 1 hàm xử lý thành công
    //catch(): Hàm nhận vào giá trị là 1 hàm xử lý thất bại
    promise.then(funcSuccess).catch(funcFail);
}
getApiSinhVien();




//Lưu ý: ajax là 1 kỹ thuật xử lí bất đồng bộ


var renderTableSinhVien = function (mangSinhVien){
    var contentTable = '';
    //Sau khi lấy được data từ backend => tạo bảng giao diện
    for (var i = 0; i < mangSinhVien.length; i++){
        //Lấy ra từng sinh viên trong dữ liệu backend trả về
        var sinhVien = mangSinhVien[i]
        //Tạo ra 1 sv object từ prototype sinh viên

        //Phải xem kỹ console trên browser để thấy rõ đúng tên trả về để đặt cho đúng vế bên phải(bao gồm ký tự viết Hoa và thường)
        var sv = new SinhVien();
        sv.maSV = sinhVien.MaSV;
        sv.tenSV = sinhVien.HoTen;
        sv.email = sinhVien.Email;
        sv.diemToan = sinhVien.DiemToan;
        sv.diemLy = sinhVien.DiemLy;
        sv.diemHoa = sinhVien.DiemHoa;
        sv.diemRenLuyen = 5;  
        contentTable += `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.email}</td>
                <td>${sv.xepLoai()}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td>
                    <button class="btn btn-primary" onclick="chinhSuaSinhVien('${sv.maSV}')">Chỉnh sửa</button>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSV}')">Xóa</button>
                </td>
            </tr>
        ` 
    }
    //Dom đến giao diện ghi thông tin dữ liệu
    document.getElementById('tableSinhVien').innerHTML = contentTable;
}

//-----------------------------THÊM DỮ LIỆU LÊN SERVER QUA API POST --------------------------

document.getElementById('btnThemSinhVien').onclick = function() {
    //Lấy thông tin từ người dùng gán vào data backend yêu cầu => Data phải chuẩn định dạng backend yêu cầu
    var sinhVien = {
        MaSV: document.getElementById('maSinhVien').value,
        HoTen: document.getElementById('tenSinhVien').value,
        Email: document.getElementById('email').value,
        SoDT: 123456789,
        CMND: 123456789,
        DiemToan: document.getElementById('diemToan').value,
        DiemLy: document.getElementById('diemLy').value,
        DiemHoa: document.getElementById('diemHoa').value,
      }
      console.log(sinhVien);
      //Dùng axios gọi ajax đưa dữ liệu lên backend xử lý
      var objectAxios = {
        url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
        method: 'POST',
        data:sinhVien //Thuộc tính backend yêu cầu dữ liệu gửi đi phải đúng định dạng
      }

      var promise = axios(objectAxios);
      promise.then(function(result){
          //Thêm thành công gọi lại api lấy danh sách sinh viên mới về
          getApiSinhVien();
          console.log(result.data);
      }).catch(function(error){
          console.log(error);
      })
}

//-------------------------- XÓA DỮ LIỆU ĐÃ THÊM TRÊN SERVER QUA API DELETE -------------------------

var xoaSinhVien = function(maSV) {
    //Dùng service gọi api xóa
    var promise = svService.xoaSinhVien(maSV);

    promise.then(function(result){
        getApiSinhVien();
        console.log(result.data);
    }).catch(function(error){
        console.log(error);
    })
}


//---------------------------CHỈNH SỬA SINH VIÊN ---------------------------
var chinhSuaSinhVien = function(maSV) {

    var promise = svService.layThongTinSinhVien(maSV);

    promise.then(function(result) {
        var sinhVienEdit = result.data;
        document.getElementById('maSinhVien').value = sinhVienEdit.MaSV;
        document.getElementById('tenSinhVien').value = sinhVienEdit.HoTen;
        document.getElementById('diemToan').value = sinhVienEdit.DiemToan;
        document.getElementById('diemLy').value = sinhVienEdit.DiemLy;
        document.getElementById('diemHoa').value = sinhVienEdit.DiemHoa;
        // document.getElementById('diemRenLuyen').value = sinhVienEdit.DiemRenLuyen;
        document.getElementById('email').value = sinhVienEdit.Email;
        //Khóa mã lại không cho người dùng chỉnh sửa
        document.getElementById('maSinhVien').disabled = true;
        //Khóa nút thêm sinh viên khi có người đang chỉnh sửa
        document.getElementById('btnThemSinhVien').disabled = true;

        // console.log(result.data)
    }).catch(function(error) {
        console.log(error);
    })
}

//-------------------- LƯU THÔNG TIN SINH VIÊN -----------------
document.getElementById('btnLuuSinhVien').onclick = function() {
    //Lấy thông tin sinh viên gán vào data gửi lên api
    var sinhVienCapNhat = {
            "MaSV": document.getElementById('maSinhVien').value,
            "HoTen": document.getElementById('tenSinhVien').value,
            "Email": document.getElementById('email').value,
            "SoDT": 123123123,
            "CMND": 123456789,
            "DiemToan": document.getElementById('diemToan').value,
            "DiemLy": document.getElementById('diemLy').value,
            "DiemHoa": document.getElementById('diemHoa').value
    }

    console.log(sinhVienCapNhat);


    //Gọi service cập nhật dữ liệu server
    var promise = svService.capNhatSinhVien(sinhVienCapNhat);
    promise.then(function(result){
        console.log(result.data);
        //Load lại table
        getApiSinhVien();
        //Mở khóa nút thêm sinh viên
        document.getElementById('btnThemSinhVien').disabled = false;
        document.getElementById('maSinhVien').disabled = false;
        document.getElementById('btnLuuSinhVien').disabled = true;
    })
}
