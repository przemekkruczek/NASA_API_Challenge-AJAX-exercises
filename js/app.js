$(function () {
    const photoUrl = 'https://api.nasa.gov/planetary/apod?api_key=Nf1Dt7s26WGyqYBDoFgq2AjN4OcEzFgUB1CImvAE';
    const marsUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=Nf1Dt7s26WGyqYBDoFgq2AjN4OcEzFgUB1CImvAE';
    const entrance = $('.entrance_page');
    const marsList = $('.mars_list');
    const buttonMars = $('.loader_photo');

    function insertphoto(photo) {
        entrance.css('background-image', 'url(' + photo + ')')
    }
    function loadphoto() {
        $.ajax({
            type: 'GET',
            url: photoUrl,
            dataType: 'json',
            contentType: 'json',
        }).done(function (response) {
            insertphoto(response.url);
        }).fail(function (error) {
            console.log(error)
        })
    }

    function insertMars(photo) {
        for (var i = 0; i < 4; i++) {
            var li = $('<li data-id=' + photo[i].id + '><div class=photo_list  style="background-image: url(' + photo[i].img_src + ')"></div></li>');
            marsList.append(li);
        }
    }
    buttonMars.on('click', function (e) {
        e.preventDefault();
        loadNextMars()
    })
    let counter = 4;
    function insertNextMars(photo) {
        for (var i = counter; i < counter + 4; i++) {
            var li = $('<li data-id=' + photo[i].id + '><div class=photo_list style="background-image: url(' + photo[i].img_src + ')"></div></li>');
            marsList.append(li);
        }
        counter = counter + 4;
    }
    function loadNextMars() {
        $.ajax({
            type: 'GET',
            url: marsUrl,
            dataType: 'json',
            contentType: 'json'
        }).done(function (response) {
            insertNextMars(response.photos);
        }).fail(function (error) {
            console.log(error)
        })
    }

    function loadmars() {
        $.ajax({
            type: 'GET',
            url: marsUrl,
            dataType: 'json',
            contentType: 'json'
        }).done(function (response) {
            insertMars(response.photos);
        }).fail(function (error) {
            console.log(error)
        })
    }
    loadphoto();
    loadmars();
})