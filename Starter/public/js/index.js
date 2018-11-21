// Get references to page elements
var $exampleText = $("#aioConceptName");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

var feelings = [];
// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/UserFeelings",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/UserFeelings",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};


var todos = [];

// Getting todos from database when page loads
getTodos();

// This function resets the todos displayed with new todos from the database
function initializeRows() {
  $feelingsList.empty();
  var rowsToAdd = [];
  for (var i = 0; i < todos.length; i++) {
    rowsToAdd.push(createNewRow(todos[i]));
  }
  $exampleList.prepend(rowsToAdd);
}

// This function grabs todos from the database and updates the view
function getTodos() {
  $.get("/api/userFeelings", function(data) {
    todos = data;
    initializeRows();
  });
}

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(UserFeelings) {
//       var $a = $("<a>")
//         .text(UserFeelings.text)
//         .attr("href", "/user/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": UserFeelings.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  

  var example = {
    feeling: $exampleText.val().trim(),
    //description: $exampleDescription.val().trim()
  };
console.log(example.feeling);

  /*if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }*/

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  // API.getExamples().then(function(){
  //   refreshExamples();
  // })

  $exampleText.val("");
  $exampleDescription.val("");
  window.location.href = '/user';
};









// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$('select').on('change',handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

