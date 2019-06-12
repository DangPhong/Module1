function kiemTraNguyenTo(n) {
    var ketQua = true;
    if (n < 2)
        ketQua = false;
    else if (n == 2)
        ketQua = true;
    else if (n % 2 == 0) {
        ketQua = false;
    } else {
        for (let i = 3; i < n - 1; i += 2) {
            if (n % i == 0) {
                ketQua = false;
                break;
            }
        }
    }
    return ketQua;
}
console.log(kiemTraNguyenTo(9));
var dem = 0;
var i = 2;
while (dem < 20) {
    if (kiemTraNguyenTo(i)) {
        dem++;
        document.write(i + "<br>");
    }
    i++;
}