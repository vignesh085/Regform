$(function () {
    if (localStorage.getItem("students") == null) {
        localStorage.setItem("students", JSON.stringify([]));
    }
    showRegistredStudents();

    dialog = $("#dialog").dialog({
        backgroundColor:'blue',
        autoOpen:false,
        width:500,
        height:500,
        modal:true,
        title:"Registration form"
    });
    
    $(".regstu").click(function(){
        dialog.dialog("open");
    });

    $("#dob").datepicker({
        changeYear: true,
        changeMonth: true,
        maxDate: "0d",
        dateFormat: "dd-mm-yy"
    });
    $(".submit").click(function () {
        var isvalid = $("#regform").validate({
            rules: {
                name: {
                    required: true,


                },
                usn: {
                    required: true,
                    minlength: 10,
                    maxlength: 10,
                },
                email: {
                    required: true,
                    email: true,
                },
                mobile: {
                    required: true,
                    minlength: 10,
                    maxlength: 10,

                },
                course: {
                    required: true,
                },
                percentage: {
                    required: true,

                    min: 55,
                    max: 100,
                },
                dob: {
                    required: true,
                }


            },
            messages: {
                name: {
                    required: "Name cannot be empty",

                },
                usn: {
                    required: "USN cannot be empty",
                },
                email: {
                    required: "Email cannot be empty"
                },
                mobile: {
                    required: "Please Enter Your Number"
                },
                course: {
                    required: "Select course"
                },
                percentage: {
                    required: "Percentage cannot be empty",
                    min: "you are not elegible",

                },
                dob: {
                    required: "Please Enter Your DOB"
                }


            }


        }).form();
        if (isvalid) {
            var name = $("#name").val();
            var usn = $("#usn").val();
            var email = $("#email").val();
            var mobile = $("#mobile").val();
            var course = $("#course").val();
            var percentage = $("#percentage").val();
            var dob = $("#dob").val();
            $(".reset").click();

            student = {
                "name": name,
                "usn": usn,
                "email": email,
                "mobile": mobile,
                "course": course,
                "percentage": percentage,
                "dob": dob,
            }
            var students = JSON.parse(localStorage.getItem("students"));
            students.push(student);
            updateLocalStorageData(students);
            showRegistredStudents();
            dialog.dialog("close")
            return false;

        }

    });

    function showRegistredStudents() {
        var students = getDataFromLocalStorage();
        var data = "";
        if (students == 0) {
            data = "<h3>students are not yet registered.....</h3>"
        } else {
            data += "<table id='regstudents'><thead><tr>";
            data += "<th>#</th>";
            data += "<th>name</th>";
            data += "<th>usn</th>";
            data += "<th>email</th>";
            data += "<th>mobile</th>";
            data += "<th>course</th>";
            data += "<th>percentage</th>";
            data += "<th>dob</th>";
            data += "</tr></thead>";
            for (var i = 0; i < students.length; i++) {
                var j = i + 1;
                data += "<tr>";
                data += "<td>" + j + "</td>"
                data += "<td>" + students[i].name + "</td>"
                data += "<td>" + students[i].usn + "</td>"
                data += "<td>" + students[i].email + "</td>"
                data += "<td>" + students[i].mobile + "</td>"
                data += "<td>" + students[i].course + "</td>"
                data += "<td>" + students[i].percentage + "</td>"
                data += "<td>" + students[i].dob + "</td>"
                data += "</tr>";
            }
            data += "</table>"
        }
        $("#content").html(data);
        $("#regstudents").dataTable({
            "pageLength": 10
        })

    }

    function getDataFromLocalStorage() {
        var students = JSON.parse(localStorage.getItem("students"));
        return students;
    }

    function updateLocalStorageData(updatedstudentsArr) {
        localStorage.setItem("students", JSON.stringify(updatedstudentsArr));
    }
});
