// Get references to page elements
var $exampleText = $("#aioConceptName");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $email = $(".email");



let sYear = "2018";
let sMonth = "01";
let sDay = "01";
let dateObj = new Date();
let eMonth = dateObj.getUTCMonth() + 1; //months from 1-12
let eDay = dateObj.getUTCDate();
let eYear = dateObj.getUTCFullYear();
let key = "eS6qfDZDKtwmh83Q5oGPjIyiUL3so4NOGVV2ixSH";
const solarSearch = "https://api.nasa.gov/DONKI/FLR?startDate=" + sYear + '-' + sMonth + '-' + sDay + "&endDate=" + eYear + '-' + eMonth + '-' + eDay + "&api_key=" + key;
var nasaData;


var feelings = [];
// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    console.log("save example ajax : ")
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/UserFeelings",
      data: JSON.stringify(example),
     // success: callback
    
    })
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
//getTodos();

// This function resets the todos displayed with new todos from the database
function initializeRows() {
  $exampleList.empty();
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

function createNewRow(todo) {
  var $newInputRow = $(
    [
      "<li class='list-group-item todo-item'>",
      "<span>",
      todo.feeling,
      "</span>",
      // "<input type='text' class='edit' style='display: none;'>",
      // "<button class='delete btn btn-danger'>x</button>",
      // "<button class='complete btn btn-primary'>✓</button>",
      // "</li>"
    ].join("")
  );

  $newInputRow.find("button.delete").data("id", todo.id);
  $newInputRow.find("input.edit").css("display", "none");
  $newInputRow.data("todo", todo);
  if (todo.complete) {
    $newInputRow.find("span").css("text-decoration", "line-through");
  }
  return $newInputRow;
}

var handleFormSubmit = function(event) {
  event.preventDefault();
  $.ajax({
    url: solarSearch,
    method: "GET"
  }).then(function(body){
     //nasaData = body;
     var nasaDataR = [];
     for (index = 0; index < body.length; ++index) {
      nasaDataR.push( body[index].beginTime,
        body[index].endTime,
        body[index].peakTime,
        body[index].classType)
     }

     nasaData = nasaDataR.toString();
     console.log("this is nasa data"+nasaData)
  });

  var example = {
    feeling: $exampleText.val().trim(),
     nasa: nasaData,
     email: $email.val()
  };
console.log("index:" + example.feeling);
// console.log(example.nasaData);


  API.saveExample(example).done(function() {
   // refreshExamples();
   // $exampleText.val("");
    //$exampleDescription.val("");
    // Whatever();
    console.log("save example return")
    window.location.href = '/user';


  });
 


 
};
function onsuccessSave(){
  window.location.href = '/user';
}


var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};



function Whatever() {
  $.ajax({
    url: solarSearch,
    method: "GET"
  })
  
  // After the data from the AJAX request comes back
    .then(function(body) {
  var nasaDataR = [];
      // console.log(response);
      var index;
      for (index = 0; index < body.length; ++index) {
        console.log(
          body[index].beginTime,
          body[index].endTime,
          body[index].peakTime,
          body[index].classType
        
          );
          nasaDataR.push( body[index].beginTime,
            body[index].endTime,
            body[index].peakTime,
            body[index].classType)
          $("#nasa").append(body[index].beginTime + " <strong>- Begin Time </strong><p></p>");
          $("#nasa").append(body[index].endTime + " <strong> - End Time<strong> <p></p>  ");
          $("#nasa").append(body[index].peakTime + " <strong>- Peak Time <strong><p> </p>  ");
          $("#nasa").append(body[index].classType + " <strong>- Class <strong><p> </p>  ");

        }
        nasaData = nasaDataR.toString();
        console.log("this is nasa data"+nasaData)
      
  
      // Creating and storing an image tag
      // var catImage = $("<img>");
  
      // Setting the catImage src attribute to imageUrl
      // catImage.attr("src", imageUrl);
      // catImage.attr("alt", "cat image");
  
      // Prepending the catImage to the images div
      // $("#images").prepend(catImage);
    });
  
}

Whatever();
// Add event listeners to the submit and delete buttons

$exampleList.on("click", ".delete", handleDeleteBtnClick);



$('select').on('change',handleFormSubmit);
//$('select').on('change',Whatever);