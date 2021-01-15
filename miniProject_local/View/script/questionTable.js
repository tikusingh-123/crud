var catId = sessionStorage.getItem("categoryId");
//to update the table dynamically
 $(document).ready(function () { 

    // FETCHING DATA FROM JSON FILE 
    $.getJSON("http://localhost:3000/categories/"+catId+"/questions",  
            function (data) { 
        var student = ''; 

        // ITERATING THROUGH OBJECTS 
        $.each(data, function (key, value) { 

            //CONSTRUCTION OF ROWS HAVING 
            // DATA FROM JSON OBJECT 
            student += '<tr>'; 
            
            
            student += '<td>' +  
                value.question + '</td>'; 

            student += '<td>' +  
                value.option1 + '</td>'; 

            student += '<td>' +  
                value.option2 + '</td>'; 

            student += '<td>' +  
                value.option3 + '</td>'; 
                                       
            student += '<td>' +  
                value.option4 + '</td>'; 
            student += '<td>' +  
                value.answer + '</td>'; 

             
            student += '<td><input type="submit" class="btn btn-primary" data-toggle="modal" data-target="#form" id="edit'+value.id+'" value="edit" onclick="confirmupdate('+value.id+',\''+value.question+'\',\''+value.option1+'\',\''+value.option2+'\',\''+value.option3+'\',\''+value.option4+'\',\''+value.answer+'\',\''+value.img+'\')"/></td>';
                
            student += '<td><input type="submit" class="btn btn-danger" id="button'+value.id+'" value="delete" onclick="confirmdelete(\''+value.id+'\')"/></td>';
            

            student += '</tr>'; 
        }); 
          
      //  $('#question').DataTable();
        //INSERTING ROWS INTO TABLE  
        $('#questiontable').append(student); 
    }); 
   
}); 



//to post data into json file using form fields.(create)


let movies = [];

const addMovie = (ev)=>

{ //confirmation for creation
    var t= confirm("Are you sure want to create ?");

 if(t==true){
    ev.preventDefault();  //to stop the form submitting
    let movie = {
        //id: $('#questionid').val(),
       categoryId:catId,
       
        question: $('#question').val(),
        option1: $('#op1').val(),
        option2: $('#op2').val(),
        option3: $('#op3').val(),
        option4: $('#op4').val(),
        answer :$('#correct').val(),
        img: $('#imgurl').val()
        

    }
    

//   console.log("adding")

  $.ajax({
      url:"http://localhost:3000/questions",
      type: "post",

      datatype:"json",
      contentType:"application/json",
      data: {
        categoryId:catId,
        question: $('#question').val(),
        option1: $('#op1').val(),
        option2: $('#op2').val(),
        option3: $('#op3').val(),
        option4: $('#op4').val(),
        answer :$('#correct').val(),
        img: $('#imgurl').val()
      },
      success: function (data){  
        console.log(data);
      },

      });
      e.preventDefault();


alert("Question Added ....")

}
else{
    alert("Failed to add question...")
}
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('btn').addEventListener('click', addMovie);
});



//to update json file using (edit tab)
const updatequestion = (ev)=>

{ 
    var ud=confirm("Are you sure you want to update ?");
    if(ud==true){
    ev.preventDefault();  //to stop the form submitting
    let movie = {
        //id: $('#editquestionid').val(),
        question: $('#editquestion').val(),
        option1: $('#editop1').val(),
        option2: $('#editop2').val(),
        option3: $('#editop3').val(),
        option4: $('#editop4').val(),
        answer :$('#editcorrect').val(),
        img : $('#editimgurl').val(),
        categoryId:catId,
    }
    

  var u= $(editquestionid).val();

  $.ajax({
      url:"http://localhost:3000/questions/"+u,
      type: "patch",

      datatype:"json",
      contentType:"application/json",

        success: function (data){

      },
      data: JSON.stringify(movie),

      });
    alert("Question update...!!")

}
else{
 alert("Updation Failed...");
}
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('patch1').addEventListener('click', updatequestion);
});


//to delete a question array in json file using question id (delete tab)

const deletequestion = (ev)=>

{
    ev.preventDefault();  //to stop the form submitting
   

  var d= $(deletequestionid).val();

  $.ajax({
      url:"http://localhost:3000/questions/"+d,
      type: "delete",
      datatype:"json",
      contentType:"application/json",

        success: function (data){
      },
     
      });
    

}


document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('delete1').addEventListener('click', deletequestion);
});



//for delete function

  function deleterow(id){

  
//   console.log("deleting")


  $.ajax({
      url:"http://localhost:3000/questions/"+id,
      type: "delete",
      datatype:"json",
      contentType:"application/json",

        success: function (data){

      },
     
      });
    
}

function editrow(id,q,op1,op2,op3,op4,answer,url)
{

    $('#editquestionid').val(id);
   $('#editquestion').val(q);
   $('#editop1').val(op1);
    $('#editop2').val(op2);
    $('#editop3').val(op3);
    $('#editop4').val(op4);
   $('#editcorrect').val(answer);
   $('#editimgurl').val(url);

    // console.log("editing");

}
//filter functionality
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#questiontable1 tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

//delete confirmation on the press of delete button in the tables

function confirmdelete(id) {
    
    var r = confirm("Are you sure you want to delete ?");
    if (r == true) {
      
        deleterow(id);

    } else
     {
    //   alert("nothing has been deleted");
    }
  }

//update confirmation on the press of update button in edit dialog form .

function confirmupdate(id,q,op1,op2,op3,op4,answer,url) {
    
    var r = confirm("are you sure you want to make changes!");
    if (r == true) {

        editrow(id,q,op1,op2,op3,op4,answer,url);

    }
    
  }


// $(function(){
//       $('#save_value').click(function(){
//         var val = [];
//         $(':checkbox:checked').each(function(i){
//           val[i] = $(this).val();
//         });
//       });
//     });

function remove(){
  sessionStorage.clear();

  window.location.replace("./");
 }




 if (sessionStorage.getItem('isActive') ) {

}else{
   window.open("../html/error/", "_self");
}



