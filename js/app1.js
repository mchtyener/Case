var data = JSON.parse(localStorage.getItem("myArray"));
$("#max").click(function () {
    sortable('desc');
})
$("#min").click(function () {

    sortable('asc');
})

$('#sequence').click(function () {
    if ($(this).prop("checked") == true) {
        newItem("sequence");
    }
});
$('#movie').click(function () {
    if ($(this).prop("checked") == true) {
        newItem("movie");
    }
});
$('#allOf').click(function () {
    if ($(this).prop("checked") == true) {
        document.getElementById('list-task').innerHTML = "";
        newItem();
    }
});

newItem();

function sortable(type) {
    const list = JSON.parse(localStorage.getItem("myArray"));
    if (type === 'asc') {
        list.sort(function (a, b) {
            return parseFloat(b.score) - parseFloat(a.score);
        });
    } else {
        data.sort(function (a, b) {
            return parseFloat(a.score) - parseFloat(b.score);
        });
    }

    showItems(list);

}

function newItem(type, is_sort = false, arr = []) {
    let list = [];
    if (is_sort === false) {
        list = JSON.parse(localStorage.getItem("myArray"));
        if (type === "sequence") {
            list = list.filter(item => item.type === 'Dizi');

        } else if (type === "movie") {
            list = list.filter(item => item.type === 'Film');
        }
    } else {
        list = arr;
    }
    showItems(list);
}

function showItems(list) {
    var table = $('#list-task')
    table.html('');
    list.forEach((data, i) => {
        var html = "";
        html += "  <div class=\"list-group-item col-lg-11 mx-auto my-1\" id='movieItem-" + data.id + "'>" +
            "                    <div class=\"row\">" +
            "                    <span class=\"col-lg-4 d-flex justify-content-center align-items-center\" id=\"name-" + i + "\">" + data.fullName + "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" id='" + data.id + "' " +
            "onclick='return removeItem(" + data.id + ")'  viewBox=\"0 0 16 16\">\n" +
            "  <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/>\n" +
            "  <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/>\n" +
            "</svg></span>" +
            "                    <span class=\"col-lg-4 d-flex justify-content-center align-items-center count\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"" +
            "                               class=\"bi bi-star-fill\" viewBox=\"0 0 16 16\">" +
            "  <path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>" +
            "</svg><span id=\'point-" + data.id + "'>" + data.score + "</span></span>" +
            "                    <span class=\"col-lg-4 d-flex flex-column align-items-center\">" +
            "                        <span>Puan Ver</span>" +
            "                        <span class=\"up\" onclick=\"return chanceScore(" + data.id + ",\'up')\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"" +
            "                                           class=\"bi bi-caret-up-fill\" viewBox=\"0 0 16 16\">\n" +
            "  <path d=\"m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z\"/>" +
            "</svg></span>" +
            "                        <span class=\"down\" onclick=\"return chanceScore(" + data.id + ",\'down')\">" +
            "                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"" +
            "                                 class=\"bi bi-caret-down-fill\" viewBox=\"0 0 16 16\">\n" +
            "  <path d=\"M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\"/>" +
            "</svg>" +
            "                        </span>" +
            "                    </span>" +
            "                    </div>" +
            "                </div>"
        table.append(html)
    })
}

function removeItem(id) {
    let list = JSON.parse(localStorage.getItem("myArray"));
    const val = list.filter(item => item.id === id);
    console.log(val);
    $(".movie-name").html(val[0].fullName + " Silmek istediğine emin misin?");
    document.getElementById('popup-container').style.display = "block";
    $("#remove").click(function () {
        list = list.filter(item => item.id !== id);
        document.getElementById('popup-container').style.display = "none";
        localStorage.setItem('myArray', JSON.stringify(list));
        $("#movieItem-" + id).remove();
    })
    $("#dontremove").click(function () {
        document.getElementById('popup-container').style.display = "none";
    })
}

function chanceScore(id, type) {
    let list = JSON.parse(localStorage.getItem("myArray"));
    let val = list.filter(item => item.id === id);
    if (type === 'up') {
        val[0].score = parseInt(val[0].score) + 1;
    } else {
        val[0].score = parseInt(val[0].score) - 1;
    }
    localStorage.setItem('myArray', JSON.stringify(list));
    $('#point-' + id).html(val[0].score);
}

