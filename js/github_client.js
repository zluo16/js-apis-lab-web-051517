//define functions here

// const authToken = "c36aae7bf8a08249beb0f3f41a058126422c1bff"

var createGist = function(file_name, content, description, token){
  let data = {
    'description': description,
    'public': true,
    'files': {}
  }

  data['files'][file_name] = {
    'content': `${content}`
  }

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    header: {
      Authorization: `token ${token}`
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    console.log(response);
    myGists(response.owner.login, token)
  })
};

var myGists = function (username, token){
  $.ajax({
    url: `https://api.github.com/users/${username}/gists`,
    type: 'get',
    contentType: 'application/json',
    dataType: 'json',
    header: {
      Authorization: `token ${token}`
    }
  }).done(function(gists) {
    $('#myGists').html('');

    $.each(gists.data, function(index, gist) {
      var link = $('<a>')
        .attr('href', gist.html_url)
        .text(gist.description);

      var listItem = $('<li>')
        .append(link);

      $('#myGists').append(listItem);
    })
  })
};

var bindCreateButton = function() {
  let fileName = $('#fileName').val(); description = $('#description').val()
  let contents = $('#contents').val(); token = $('#personalToken').val()

  createGist(fileName, contents, description, token)
};

$(document).ready(function(){
  $('#create-gist').on('click', function() {
    bindCreateButton()
  })
});

// '{"description":"the description for this gist","public":true,"files":{"file1.txt":{"content":"String file contents"}}}'
