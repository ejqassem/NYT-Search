window.onload = function() {


$("#search").on("click", function(event) {

  var page;
  var term = $("#term").val().trim();
  var records = $("#records").val().trim();


  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9d7068958bdf4f8db4b43ee759924b10";



  if ($("#term").val && $("#records").val == null) {
    // defaults to one page if no user input on input criteria
  url =   "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9d7068958bdf4f8db4b43ee759924b10&q=" + term + "&page=1";
  }

  else if($("#term").val && $("#records").val && $("#start").val) {
    if (records < 10) {
      page = 1;
    }
    else if (11 <= records <= 20) {
      page = 2;
    }
    else if (21 <= records <= 30) {
      page = 3;
    }

    url =   "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9d7068958bdf4f8db4b43ee759924b10&q=" + term +"&page=" + page;

  }


  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {

    var data = result.response;

    for (i = 0; i < records; i++) {
      var headline = data.docs[i].headline.main;
      var webURL = data.docs[i].web_url;
      var snippet = data.docs[i].snippet;

      var newInfo = document.createElement("div");
      newInfo.setAttribute("class", "articles");
      newInfo.innerHTML = "<span id='headline'>" +headline + "</span>" + "<br>" + snippet + "<br>" + "<p><a href= webURL>" + webURL + "</a></p>";
      $("#results").append(newInfo);
    }


  }).fail(function(err) {
    throw err;
  });


});
}
