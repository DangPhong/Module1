function tinhSoNgay() {
    var thang = document.getElementById("thang").value;
    var kq = 0;
    //thang=parseInt(thang);
    switch (thang) {
        case '1':
        case '3':
        case '5':
        case '7':
        case '8':
        case '10':
        case '12':
            kq = '31';
            break;
        case '4':
        case '6':
        case '9':
        case '11':
            kq = '30';
            break;
        case '2':
            kq = '28 hoặc 29 ngày';
            break;
        default:
            kq = 'Nhập sai tháng';
    }
    var str = '';
    str += 'Tháng ' + thang + ' có ' + kq + ' ngày ';
    console.log(document.getElementById("ketQua"));
    document.getElementById("ketQua").innerHTML = str;
  
}

