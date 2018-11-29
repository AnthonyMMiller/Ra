
$(document).ready(function(){

  console.log($email)

function getUserFeelings() {
  $.get("/api/today", function(data) {
    // console.log(data)
    todos = data;
    GetData(data);
   
  });
}

function getMoon(){
  $.get("/api/moon", function(data){
      displayMoon(data);
      console.log(data)
  });
};
getMoon();

function displayMoon(data){
  var phase;
  var phaseAR = data[0].phasedata
  phaseAR.forEach(x => {
    $("#navy").append("date: " + x.date + " - ");
    $("#navy").append("phase: " + x.phase);
    $("#navy").append("<br>");  
  });
  
  //$("#navy").append("phase: " + phaseAR.toString())
}

getUserFeelings();

function GetData (Jdata ){
  var test; 
  test = getStats(Jdata);
  romaP = Math.floor((test.Headaches/test.total)*100);
  
  tottiP = Math.floor((test.Hyper/test.total)*100);

  Dizziness = Math.floor((test.Dizziness/test.total)*100);
  Sleep = Math.floor((test.Sleep/test.total)*100);
  Anxiety = Math.floor((test.Anxiety/test.total)*100);
  Increased = Math.floor((test.Increased/test.total)*100);
  Fine = Math.floor((test.Fine/test.total)*100);
  console.log("this should be my  obj with roma #" + test.Headaches);
  
  $(".stats").append(romaP +"% of users are feeling Headaches or migraines today");
  $(".stats").append("<br>");
  $(".stats").append(tottiP +"% of users are feeling Hyper-tension today");

  $(".stats").append("<br>");
  $(".stats").append(Dizziness +"% of users are feeling Dizziness today");
  $(".stats").append("<br>");
  $(".stats").append(Sleep +"% of users are feeling Sleepy today");
  $(".stats").append("<br>");
  $(".stats").append(Anxiety +"% of users are feeling Anxiety today");
  $(".stats").append("<br>");
  $(".stats").append(Increased +"% of users are feeling Increased sensitivity today");
  $(".stats").append("<br>");
  $(".stats").append(Fine +"% of users are feeling Fine today");
 
};


function getStats(feeling){
 var data = {
  Headaches:0,
  Hyper:0,
  Dizziness:0,
  Sleep:0,
  Anxiety:0,
  Increased:0,
  Fine:0,
   total:0
 };
 feeling.forEach(x => {
  data.total++;
  switch(x.feeling){
    case "Headaches or migraines, the feeling of pressure in your head":
       data.Headaches++
      break;
    case"Hyper-tension (high blood pressure)": 
      data.Hyper++
      break;

    case"Dizziness, the jitters or vertigo": 
      data.Dizziness++
      break;

    case"Sleep Issues": 
      data.Sleep++
      break;

    case"Anxiety and worrying": 
      data.Anxiety++
      break;

    case"Increased sensitivity": 
      data.Increased++
      break;

    case"Fine": 
      data.Fine++
      break;
  }
 });
  return data;
}

function Whatever() {
  $.ajax({
    url: solarSearch,
    method: "GET"
  })
  
  // After the data from the AJAX request comes back
    .then(function(body) {
  
      // console.log(response);
      var index;
      for (index = 0; index < body.length; ++index) {
        console.log(
          body[index].beginTime,
          body[index].endTime,
          body[index].peakTime,
          body[index].classType
        
          );
          $("#nasa").append(body[index].beginTime + " <strong>- Begin Time </strong><p></p>");
          $("#nasa").append(body[index].endTime + " <strong> - End Time<strong> <p></p>  ");
          $("#nasa").append(body[index].peakTime + " <strong>- Peak Time <strong><p> </p>  ");
          $("#nasa").append(body[index].classType + " <strong>- Class <strong><p> </p>  ");

        }
      
  
    
    });

  
}

Whatever();






});

