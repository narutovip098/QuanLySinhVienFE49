
// Chứa thông tin tất cả sinh viên được thêm từ form
var mangSinhVien = [];
var validate = new Validation();


document.getElementById('btnThemSinhVien').onclick = function() {
    // Lấy thông tin sinh viên thêm vào đối tượng sinh viên
    var sinhVien = new SinhVien();
    sinhVien.maSV = document.getElementById('maSinhVien').value;
    sinhVien.tenSV = document.getElementById('tenSinhVien').value;
    sinhVien.email = document.getElementById('email').value;
    sinhVien.loaiSV = document.getElementById('loaiSinhVien').value;
    sinhVien.diemToan = document.getElementById('diemToan').value;
    sinhVien.diemLy = document.getElementById('diemLy').value;
    sinhVien.diemHoa = document.getElementById('diemHoa').value;
    sinhVien.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    console.log(sinhVien);


    //Kiểm tra dữ liệu hợp lệ trước khi thêm vào mảng

    //Dùng Validate trong Validation.js để thêm 'Không được bỏ tróng'
    var valid = validate.kiemTraRong(sinhVien.maSV,'#error_maSinhVien') & validate.kiemTraRong(sinhVien.tenSV,'#error_tenSinhVien') & validate.kiemTraRong(sinhVien.email,'#error_email') & validate.kiemTraRong(sinhVien.diemToan, '#error_diemToan') & validate.kiemTraRong(sinhVien.diemLy, '#error_diemLy') & validate.kiemTraRong(sinhVien.diemHoa, '#error_diemHoa') & validate.kiemTraRong(sinhVien.diemRenLuyen, '#error_diemRenLuyen');


    //-------------Kiểm tra tên là ký tự --------------
    valid &= validate.kiemTraTatCaLaChuoi(sinhVien.tenSV,'#error_all_letter_tenSinhVien');

    //Kiểm tra email
    valid &= validate.kiemTraEmail(sinhVien.email, '#error_all_letter_email');

    //Kiểm tra điểm
    valid &= validate.kiemTraDiem(sinhVien.diemToan, '#error_format_diemToan') & validate.kiemTraDiem(sinhVien.diemLy, '#error_format_diemLy') & validate.kiemTraDiem(sinhVien.diemHoa, '#error_format_diemHoa') & validate.kiemTraDiem(sinhVien.diemRenLuyen, '#error_format_diemRenLuyen');

    valid &= validate.kiemTraGiaTri(sinhVien.diemToan, '#error_min_max_value_diemToan',0.0,10.0) & validate.kiemTraGiaTri(sinhVien.diemLy, '#error_min_max_value_diemLy',0.0,10.0) & validate.kiemTraGiaTri(sinhVien.diemHoa, '#error_min_max_value_diemHoa',0.0,10.0) & validate.kiemTraGiaTri(sinhVien.diemRenLuyen, '#error_min_max_value_diemRenLuyen',0.0,10.0);

    //Kiểm tra độ dài
    valid &= validate.kiemTraDoDaiChuoi(sinhVien.maSV, '#error_length_maSinhVien',4,6);

    

//------------------------------------------------------------------------------------------------------------------
    //TẤT CẢ DỮ LIỆU KHI NHẬP VÀO PHẢI ĐƯỢC KIỂM TRA TRƯỚC HÀM VALID
    if(!valid){ //Nếu như valid === false => không hợp lệ
        //return ; là dừng chương trình
        return ;
    }

    
    //trim(): phương thức loại bỏ khoảng trống đấu và cuối của chuỗi

    // Đây là cách thêm dòng chữ 'Không được bỏ trống' thủ công, nhưng nên theo cách làm ở trên Validate để dùng như 1 lớp đối tượng

    // if(sinhVien.maSV.trim() === ''){
    //     //Dom đến thẻ thông báo dưới thẻ input #maSV (display block, và ghi lỗi)
    //     document.getElementById('error_maSinhVien').style.display = 'block';
    //     document.getElementById('error_maSinhVien').innerHTML = 'Mã sinh viên không được bỏ trống';
    //     valid = false ;
    // }else { //Trường hợp người dùng nhập hợp lệ (display none, gán rỗng lỗi)
    //     document.getElementById('error_maSinhVien').style.display = 'none';
    //     document.getElementById('error_maSinhVien').innerHTML = '';
    // }
    // if(sinhVien.tenSV.trim() === ''){
    //     //Dom đến thẻ thông báo dưới thẻ input #tenSV (display block, và ghi lỗi)
    //     document.getElementById('error_tenSinhVien').style.display = 'block';
    //     document.getElementById('error_tenSinhVien').innerHTML = 'Tên sinh viên không được bỏ trống';
    //     valid = false ;
    // }else { //Trường hợp người dùng nhập hợp lệ (display none, gán rỗng lỗi)
    //     document.getElementById('error_tenSinhVien').style.display = 'none';
    //     document.getElementById('error_tenSinhVien').innerHTML = '';
    // }
    // if(sinhVien.email.trim() === ''){
    //     //Dom đến thẻ thông báo dưới thẻ input #email (display block, và ghi lỗi)
    //     document.getElementById('error_email').style.display = 'block';
    //     document.getElementById('error_email').innerHTML = 'Email sinh viên không được bỏ trống';
    //     valid = false ;
    // }else { //Trường hợp người dùng nhập hợp lệ (display none, gán rỗng lỗi)
    //     document.getElementById('error_email').style.display = 'none';
    //     document.getElementById('error_email').innerHTML = '';
    // }
    // if(sinhVien.diemToan.trim() === ''){
    //     //Dom đến thẻ thông báo dưới thẻ input #diemToan (display block, và ghi lỗi)
    //     document.getElementById('error_diemToan').style.display = 'block';
    //     document.getElementById('error_diemToan').innerHTML = 'Điểm Toán không được bỏ trống';
    //     valid = false ;
    // }else { //Trường hợp người dùng nhập hợp lệ (display none, gán rỗng lỗi)
    //     document.getElementById('error_diemToan').style.display = 'none';
    //     document.getElementById('error_diemToan').innerHTML = '';
    // }
    // if(sinhVien.diemLy.trim() === ''){
    //     //Dom đến thẻ thông báo dưới thẻ input #diemLy (display block, và ghi lỗi)
    //     document.getElementById('error_diemLy').style.display = 'block';
    //     document.getElementById('error_diemLy').innerHTML = 'Điểm Lý không được bỏ trống';
    //     valid = false ;
    // }else { //Trường hợp người dùng nhập hợp lệ (display none, gán rỗng lỗi)
    //     document.getElementById('error_diemLy').style.display = 'none';
    //     document.getElementById('error_diemLy').innerHTML = '';
    // }
    // if(sinhVien.diemHoa.trim() === ''){
    //     //Dom đến thẻ thông báo dưới thẻ input #diemHoa (display block, và ghi lỗi)
    //     document.getElementById('error_diemHoa').style.display = 'block';
    //     document.getElementById('error_diemHoa').innerHTML = 'Điểm Hóa không được bỏ trống';
    //     valid = false ;
    // }else { //Trường hợp người dùng nhập hợp lệ (display none, gán rỗng lỗi)
    //     document.getElementById('error_diemHoa').style.display = 'none';
    //     document.getElementById('error_diemHoa').innerHTML = '';
    // }
    // if(sinhVien.diemRenLuyen.trim() === ''){
    //     //Dom đến thẻ thông báo dưới thẻ input #diemRenLuyen (display block, và ghi lỗi)
    //     document.getElementById('error_diemRenLuyen').style.display = 'block';
    //     document.getElementById('error_diemRenLuyen').innerHTML = 'Điểm rèn luyện không được bỏ trống';
    //     valid = false ;
    // }else { //Trường hợp người dùng nhập hợp lệ (display none, gán rỗng lỗi)
    //     document.getElementById('error_diemRenLuyen').style.display = 'none';
    //     document.getElementById('error_diemRenLuyen').innerHTML = '';
    // }

    // Cách 2: push(): phương thức thêm 1 phần tử vào mangSinhVien
    mangSinhVien.push(sinhVien);

    renderTableSinhVien(mangSinhVien);
    luuLocalStorage();


    // Cách 1: thông qua tạo các thẻ tr và td
    // // Tạo nội dung thẻ tr SinhVien
    // var trSinhVien = document.createElement('tr');
    // // Tạo nội dung các thẻ td
    // var tdMaSinhVien = document.createElement('td');
    // tdMaSinhVien.innerHTML = sinhVien.maSV;

    // var tdTenSinhVien = document.createElement('td');
    // tdTenSinhVien.innerHTML = sinhVien.tenSV;

    // var tdEmail = document.createElement('td');
    // tdEmail.innerHTML = sinhVien.email;

    // var tdLoaiSinhVien = document.createElement('td');
    // tdLoaiSinhVien.innerHTML = sinhVien.xepLoai();

    // var tdDiemTrungBinh = document.createElement('td');
    // tdDiemTrungBinh.innerHTML = sinhVien.tinhDiemTrungBinh().toFixed(2);

    // var tdDiemRenLuyen = document.createElement('td');
    // tdDiemRenLuyen.innerHTML = sinhVien.diemRenLuyen;

    // // Thêm 1 trường td dành cho button Xóa
    // var tdAction = document.createElement('td');

    // var btnXoa = document.createElement('button');
    // btnXoa.innerHTML='Xóa';
    // btnXoa.className = 'btn btn-danger';
    // btnXoa.id = 'btnXoa';
    // btnXoa.onclick = function() {
    //     // Tìm ra phần tử cha (td) => Từ td tìm ra tr để xóa
    //     btnXoa.parentElement.parentElement.remove();
    // }

    // tdAction.appendChild(btnXoa);

    // //Đưa các thẻ td vào thẻ tr
    // trSinhVien.appendChild(tdMaSinhVien);
    // trSinhVien.appendChild(tdTenSinhVien);
    // trSinhVien.appendChild(tdEmail);
    // trSinhVien.appendChild(tdLoaiSinhVien);
    // trSinhVien.appendChild(tdDiemTrungBinh);
    // trSinhVien.appendChild(tdDiemRenLuyen);
    // trSinhVien.appendChild(tdAction);
    // //Dom đến thẻ tbody appenChild(tr)
    // document.getElementById('tableSinhVien').appendChild(trSinhVien);
}


var renderTableSinhVien = function() {

    //Từ dữ liệu mảng tạo ra các thẻ tr tương ứng
    var chuoiTr = '';
    for(var index = 0; index < mangSinhVien.length; index++){
        //Mỗi lần duyệt lấy ra dữ liệu của 1 sinh viên trong mảng
        var sinhVien = mangSinhVien[index];
        //Tạo object mới lấy dữ liệu từ mangSinhVien[i] gắn qua
        var sv = new SinhVien();
        sv.maSV = sinhVien.maSV;
        sv.tenSV = sinhVien.tenSV;
        sv.email = sinhVien.email;
        sv.diemToan = sinhVien.diemToan;
        sv.diemLy = sinhVien.diemLy;
        sv.diemHoa = sinhVien.diemHoa;
        sv.diemRenLuyen = sinhVien.diemRenLuyen;
        //Từ dữ liệu sinh viên tạo ra từng dòng <tr> tương ứng
        chuoiTr += `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.email}</td>
                <td>${sv.xepLoai()}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSV}')">Xóa</button></td>
            </tr>
        `
    }

    //Thoát ra vòng lặp
    document.getElementById('tableSinhVien').innerHTML = chuoiTr;
}

var xoaSinhVien = function(maSV) {
    // Từ mã sinh viên sẽ tìm ra thằng sinhVien cần xóa
    // nếu duyệt mảng từ đầu đến phần tử cuối, khi xóa thì vị trí index sẽ bị thay đổi(thụt lùi về phía trước) nên các phần tử khi xóa sẽ bị loạn, không xóa, nên ta sẽ duyệt từ cuối mảng lên đầu mảng để khi xóa vị trí phía trước sẽ không bị thay đổi => xóa hết các thằng giống nhau
    // **LƯU Ý: trong javascript thì Array không hẳn là array mà là linkedList
    for(var index = mangSinhVien.length - 1; index >= 0 ; index--){
        // Mỗi lần duyệt lấy ra 1 sinhVien
        var sinhVien = mangSinhVien[index];
        if(sinhVien.maSV === maSV) //Nếu sinhVien trong mảng có mã = maSinhVien được click
        {
            //Tại vị trí đó mình sẽ xóa phần đó đi, với số 1 phía sau là số lượng phần tử xóa, nếu index,2 thì sẽ xóa tại vị trí đã tìm thấy + vị trí tiếp theo sau
            mangSinhVien.splice(index,1);
        }
    }
    //Sau khi xóa xong tạo lại tableSinhVien
    renderTableSinhVien(mangSinhVien);

    //Muốn xóa localStorage sau khi lưu thì gọi lại localStorage TRỐNG ghi đè lên trong mục xoaSinhVien
    // luuLocalStorage();
}


var  luuLocalStorage = function() {
    //Biến mangSinhVien => chuỗi
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    //Lưu vào localstorage
    localStorage.setItem('mangSinhVien',sMangSinhVien);
}

var layDuLieuLocalStorage = function() {
    //Trước khi lấy thì phải kiểm tra coi có hay không
    if(localStorage.getItem('mangSinhVien')){
        //Lấy dữ liệu từ localstorage
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
        //Chuyển chuỗi localstorage về mảng (object) và gán cho mangSinhVien
        mangSinhVien = JSON.parse(sMangSinhVien);
        // Gọi hàm render mangSinhVien => render lại table
        renderTableSinhVien(mangSinhVien);
        // console.log(sMangSinhVien);
    }
}

layDuLieuLocalStorage();

console.log('TAO Ở ĐÂY NÈ, AJAX axios ĐÓ!',axios);