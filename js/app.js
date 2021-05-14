function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

///popup close
let close = document.getElementById('popupClose');
close.addEventListener('click', function () {
    document.getElementById('popup-container').style.display = "none";
})


var saveBtn = document.getElementById('saveBtn');
var radioBtnValue;
var fullName;


saveBtn.addEventListener('click', function () {
    fullName = document.getElementById('fullName').value;
    score = document.getElementById('videoStart').value;
    if (fullName === "") {
        alert("Lütfen boş bıraktığınız yerleri doldurunuz")
        return false;
    } else if (score === "") {
        alert("Lütfen boş bıraktığınız yerleri doldurunuz")
        return false;
    }

    var ele = document.getElementsByName('video');


    var isChecked = $('input[name=video]').is(':checked');
    if (isChecked) {
        for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                radioBtnValue = ele[i].value;
            }
        }
    } else {
        alert("Lütfen kaydetmek istediğiniz türü seçin")
        return false;
    }
    let id = 0;
    let list = JSON.parse(localStorage.getItem("myArray"));
    if ( list != null) {
        id = list.length + 1;
    } else {
        list=[];
        id = 1;
    }
    list.push({id: id, fullName: fullName, score: score, type: radioBtnValue});
    document.getElementById('fullName').value = "";
    document.getElementById('videoStart').value = "";
    document.getElementById('popup-container').style.display = "block";
    localStorage.setItem('myArray', JSON.stringify(list))
    document.getElementById('fullName').value = "";
    document.getElementById('videoStart').value = "";
})








