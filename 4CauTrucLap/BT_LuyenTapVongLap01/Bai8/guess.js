function enterNumber() {
    var n = prompt("Mời bạn nhập một số từ 0-9");

    //Return a random number between 1 and 10:
    var r = Math.floor((Math.random() * 10) + 1);
    if (n == r)
        alert("Chúc mừng bạn đã đoán trúng!");
    else
        alert("Số của chúng tôi là: " + r + "\n Rất tiếc, bạn đoán chưa chính xác!");

}
enterNumber();