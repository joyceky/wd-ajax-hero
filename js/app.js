(function() {
  'use strict';

  var movies = [];

  var renderMovies = function() {
    $('#listings').empty();

    for (var movie of movies) {
      var $col = $('<div class="col s6">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50, });
      $title.text(movie.title);

      var $poster = $('<img class="poster">');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      var $modal = $(`<div id="${movie.id}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
      var $modalHeader = $('<h4>').text(movie.title);
      var $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      var $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  $( document ).ready(function() {
    var searchBtn = $("#searchBtn");
    searchBtn.on("click", function(event){
      event.preventDefault();
      var movieTitle = $(this).closest("form").find("input[name='search']").val();
      if(movieTitle === "") {
        alert("Please enter a movie title!");
        return;
      }
      movieTitle = movieTitle.replace(/\s+/g, '');
      $('#search').val('');
      getMovie(movieTitle);
    });
  });


  function getMovie(movieTitle) {
      var currentURL = "http://www.omdbapi.com/?t="+ movieTitle + "&y=&plot=full&r=json";
      var request = $.ajax({
          type: "GET",
          url: currentURL,
          dataType: "json"
      });

      request.done(function (data) {
        console.log(data);
        var movie = {
          id: data['imdbID'],
          poster: data['Poster'],
          title: data['Title'],
          year: data['Year'],
          plot: data['Plot']
        };
        console.log(movie);
        movies.push(movie);

        console.log(movies);
        renderMovies(movie);
      });

      request.fail(function (jqXHR, textStatus) {
          alert('Request failed: ' + textStatus);
      });
    }
})();
