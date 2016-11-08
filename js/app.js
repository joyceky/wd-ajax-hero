'use strict';

(function() {

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

  // var movieTitle = $(this).closest("form").find("input[name='search']").val();


  // ADD YOUR CODE HERE
  $( document ).ready(function() {
    $("#searchBtn").on("click", function(event){
      event.preventDefault();
      var movieTitle = $("#search").val();
      if(movieTitle === "") {
        alert("Please enter a movie title!");
        return;
      }
      movieTitle = movieTitle.replace(/\s+/g, '');
      $('#search').val('');
      getMovie(movieTitle);
    });
  });


  // function getMovie(movieTitle) {
  //     var currentURL = "http://www.omdbapi.com/?s="+ movieTitle;
  //     var request = $.ajax({
  //         type: "GET",
  //         url: currentURL,
  //         dataType: "json"
  //     });

function getMovie(movieTitle) {
      var $xhr = $.getJSON("http://www.omdbapi.com/?s="+ movieTitle + "&y=&plot=full&r=json");

$xhr.done(function(data) {
    if ($xhr.status !== 200) {
        return;
    }
    console.log(data);
    for (var i = 0; i < data.Search.length; i++) {
      var movie = {
            id: data.Search[i]['imdbID'],
            poster: data.Search[i]['Poster'],
            title: data.Search[i]['Title'],
            year: data.Search[i]['Year']
          }

            var $xhr2 = $.getJSON("http://www.omdbapi.com/?t=" + movie.id);

            $xhr2.done(function(data) {
                if ($xhr.status !== 200) {
                    return;
                }
                console.log(data);
                movie = {
                  plot: data['Plot']
          };
                console.log(movie);
          });
          console.log(movie);

      movies.push(movie);
    }
  renderMovies();
});
}
})();

//
// function getPlot(movie) {
//   //for each data search id, plug in id and get plot, then render movies
//   var $xhr = $.getJSON("http://www.omdbapi.com/?t=" + movie.id);
//
//   $xhr.done(function(data) {
//       if ($xhr.status !== 200) {
//           return;
//       }
//       console.log(data);
//       movie = {
//         plot: data['Plot']
// };
//       console.log(movie);
//   });
//   renderMovies();
//
//  }

//       request.done(function (data.Search) {
//         console.log(data.Search);
//         // var movie = {
//         //   id: data['imdbID'],
//         //   poster: data['Poster'],
//         //   title: data['Title'],
//         //   year: data['Year'],
//         //   plot: data['Plot']
//         // };
//         // console.log(movie);
//         // movies.push(movie);
//         //
//         // console.log(movies);
//         // renderMovies(movie);
//       });
//
//       request.fail(function (jqXHR, textStatus) {
//           alert('Request failed: ' + textStatus);
//       });
//     }
