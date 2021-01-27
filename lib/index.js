'use strict';

var validFormFieldInput = function validFormFieldInput() {
    var newTaskNameInput = document.querySelector('#task-name');
    var name = newTaskNameInput.value;
    var newDescriptionInput = document.querySelector('#description');
    var description = newDescriptionInput.value;
    var newAssignedInput = document.querySelector('#assigned-to');
    var assigned = newAssignedInput.value;
    var newDateInput = document.querySelector('#due-date');
    var date = newDateInput.value;
    if (name === "") {
        $('#name-alert').show();
        setTimeout(function () {
            $('#name-alert').hide();
        }, 2500);
        return false;
    }
    if (description === "") {
        $('#descrip-alert').show();
        setTimeout(function () {
            $('#descrip-alert').hide();
        }, 2500);
        return false;
    }
    if (assigned === "") {
        $('#to-alert').show();
        setTimeout(function () {
            $('#to-alert').hide();
        }, 2500);
        return false;
    }
    if (date === "") {
        $('#due-alert').show();
        setTimeout(function () {
            $('#due-alert').hide();
        }, 2500);
        return false;
    }
};
//setTimeout(()=>{alert("HI Hiruy")},2000)