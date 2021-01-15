var questions = [];
var answers = [];
var quizdata =[];
var i = -1;
var response = [];
var timer;
var userId = sessionStorage.getItem('userId');
var subject = "";
var web;
var minutes = 0;
var seconds = 0;
var categoryId = sessionStorage.getItem('categoryId');
var images = [];


$(document).ready(function(){
    $.ajax(
    {
        url : "http://localhost:3000/categories/"+categoryId+"/questions",
        method : "GET",
        async  : false,
        success : function(e){
            e.forEach(element => {
                quizdata.push(element);
                questions.push(element.question);
                answers.push(element.answer);
                images.push(element.img);
            });
            
        },
        error : function (err) {
            alert("sorry database is not ready. Bye ");
            window.open("../html/scoreCard.html",'_self') ;
        }
    }
    )

    console.log(images);
    if(!sessionStorage.getItem("timer")){
        sessionStorage.setItem("timer",(new Date()).valueOf())
    }
    if (typeof(Worker)!=="undefined"){
        if (web==null){
           web = new Worker("../script/worker.js");
        }
        web.postMessage(sessionStorage.getItem('timer'));
        web.onmessage = function (event) {
            if(event.data.minutes >= 30) {
                $('#submit').click();
            }
            $("#timer").html(event.data.minutes + ':' + event.data.seconds);
            minutes = event.data.minutes;
            seconds = event.data.seconds;
        };
     } else {
        document.getElementById("timer").innerHTML = "Sorry, your browser does not support Web Workers ...";
     }
    
    $("input[type='radio']").click(function () {

        var ans = $('input[name="option"]:checked').val();
        if (ans) {
            response[i] = ans;
        }

    });

    $("#title").text(sessionStorage.getItem("title"));
    createQuestion();

    function createQuestion(){
        
        if (i < questions.length - 1) {
            i++;
            $("input[name='option']").prop('checked', false);
            $('#question').text(questions[i]);
            if(image[i] != ""){
                console.log("here");
                $("#image").attr("src",images[i]);
            }else{
                $("image").html(null);
            }
            $('#btnradio1').val(quizdata[i].option1);
            $('#ops1').text('1. ' + quizdata[i].option1);

            $('#btnradio2').val(quizdata[i].option2);
            $('#ops2').text('2. ' + quizdata[i].option2);

            $('#btnradio3').val(quizdata[i].option3);
            $('#ops3').text('3. ' + quizdata[i].option3);

            $('#btnradio4').val(quizdata[i].option4);
            $('#ops4').text('4. ' + quizdata[i].option4);
            if (response[i]) {
                $(`input[name="option"][value="${response[i]}"]`).prop('checked', true);
            }
        }
    }

    function resetQuestion(){
        if (i > 0) {
            
            i--;
            $("input[name='option']").prop('checked', false);
            $('#question').text(questions[i]);
            if(image[i] != ""){
                console.log("here");
                $("#image").attr("src",images[i]);
            }else{
                $("image").html(null);
            }
            $('#btnradio1').val(quizdata[i].option1);
            $('#ops1').text('1. ' + quizdata[i].option1);

            $('#btnradio2').val(quizdata[i].option2);
            $('#ops2').text('2. ' + quizdata[i].option2);

            $('#btnradio3').val(quizdata[i].option3);
            $('#ops3').text('3. ' + quizdata[i].option3);

            $('#btnradio4').val(quizdata[i].option4);
            $('#ops4').text('4. ' + quizdata[i].option4);
                
            $(`input[name="option"][value="${response[i]}"]`).prop('checked', true);
        }
    }

    $('#next-btn').click(function () {
        createQuestion();
    })

    $('#first-btn').click(function () {
        i = -1;
        createQuestion();
    })

    $('#last-btn').click(function () {
        i = questions.length - 2;
        createQuestion();
    })

    $('#previous-btn').click(function () {
        resetQuestion();
    })
    
    $('#submit').click(function () {
        let marks = 0;
        web.terminate();
        web = undefined;
        for (let j = 0; j < questions.length; j++) {
            if (response[j] == answers[j]) {
                marks++;
            }
        }
        let percent = marks / questions.length * 100;
        let datetime = new Date();
        let time = datetime.toTimeString().split(" ")[0]
        let date = datetime.getDate()+'/'+(parseInt(datetime.getMonth())+1)+'/'+datetime.getFullYear();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/quiz_data",
            dataType: "json",
            async: false,
            success: function (msg) {
                if (msg) {
                    console.log(msg);
                } else {
                    console.log("Cannot add to list !");
                }
            },

            data: {
                "userId": userId,
                "categoryId": categoryId,
                "marks": marks,
                "totalMarks": questions.length,
                "timeElapsed": minutes+':'+seconds,
                "dateTime": date+ ' : '+time,
                "percent" : percent
            }
        });
        sessionStorage.setItem("marks",marks);
        sessionStorage.setItem("totalQues",questions.length);
        sessionStorage.setItem("subject",subject);
        sessionStorage.setItem("time",minutes+':'+seconds);
        sessionStorage.setItem("percentage",percent);
        window.open("../html/scoreCard.html",'_self') ;

    })

    if (sessionStorage.getItem('isActive') && sessionStorage.getItem('categoryId') && sessionStorage.getItem('userId') ) {
    }else{
       window.open("../html/error/", "_self");
    }
});