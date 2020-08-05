var Validation = function() {

    this.kiemTraRong = function(value, selectorError){
        if(value.trim() === ''){
            document.querySelector(selectorError).innerHTML = 'Không được bỏ trống';
            document.querySelector(selectorError).style.display = 'block';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true;
    }

    this.kiemTraTatCaLaChuoi = function(value, selectorError) {
        var regexAllLetter = /^[a-z A-Z]+$/;
        if(regexAllLetter.test(value.trim())){
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).display = 'none';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Không được nhập số và ký tự đặc biệt';
        document.querySelector(selectorError).display = 'block';
        return false;
    }

    this.kiemTraEmail = function(value,selectorError){
        var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regexEmail.test(value.trim())){
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).display = 'none';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Email không hợp lệ';
        document.querySelector(selectorError).display = 'block';
        return false;
    }

    this.kiemTraDiem = function(value,selectorError){
        var regexDiem = /^(\d{1,2}(\.\d{1,2})?)$/;
        if(regexDiem.test(value.trim())){
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).display = 'none';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Điểm phải ở dạng số';
        document.querySelector(selectorError).display = 'block';
        return false;
    }

    this.kiemTraGiaTri = function(value,selectorError,minValue,maxValue){

        //Thêm valid vào để thông báo lỗi giá trị từ min đến max 
        var valid = this.kiemTraDiem(value,selectorError);
        //Nếu nhỏ hơn giá trị nhỏ nhất hoặc lớn hơn giá trị lớn nhất thì báo lỗi
        if(Number(value.trim()) < minValue || Number(value.trim()) > maxValue || !valid ){
            document.querySelector(selectorError).innerHTML = `Giá trị từ ${minValue} - ${maxValue} !`;
            document.querySelector(selectorError).style.display = 'block';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).display = 'none';
            return true;
    }

    this.kiemTraDoDaiPassword = function(value,selectorError){
        var regexDoDai = /^[0-9a-zA-Z].{7,15}$/
        if(regexDoDai.test(value.trim())){
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).display = 'none';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Độ dài từ 8-16 ký tự';
        document.querySelector(selectorError).display = 'block';
        return false;
    }

    this.kiemTraDoDaiChuoi = function(value,selectorError,minLength,maxLength){
        if(value.length < minLength || value.length > maxLength){
            document.querySelector(selectorError).innerHTML = `Độ dài từ ${minLength} - ${maxLength}!`;
            document.querySelector(selectorError).style.display = 'block';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).display = 'none';
            return true;
    }
}