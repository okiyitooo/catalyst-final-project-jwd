'use strict';

var taskManager = new TaskManager();
taskManager.load();
taskManager.render();
var validFormFieldInput = function validFormFieldInput() {
    var newTaskNameInput = document.querySelector('#task-name');
    var name = newTaskNameInput.value;
    var newDescriptionInput = document.querySelector('#description');
    var description = newDescriptionInput.value;
    var newAssignedToInput = document.querySelector('#assigned-to');
    var assignedTo = newAssignedToInput.value;
    var newDueDateInput = document.querySelector('#due-date');
    var dueDate = newDueDateInput.value;
    if (name === "") {
        $('#name-alert').show();
        setTimeout(function () {
            $('#name-alert').hide();
        }, 2000);
        $('#task-name').focus();
        return false;
    }
    if (description === "") {
        $('#descrip-alert').show();
        setTimeout(function () {
            $('#descrip-alert').hide();
        }, 2000);
        $('#description').focus();
        return false;
    }
    if (assignedTo === "") {
        $('#assigned-alert').show();
        setTimeout(function () {
            $('#assigned-alert').hide();
        }, 2000);
        $('#assigned-to').focus();
        return false;
    }
    if (dueDate === "") {
        $('#due-alert').show();
        setTimeout(function () {
            $('#due-alert').hide();
        }, 2000);
        $('#due-date').focus();
        return false;
    }
    taskManager.addTask(name, description, assignedTo, dueDate, $('.create-button').html() == "UPDATE" ? "UPDATED" : "TODO");
    $('.create-button').removeClass('btn-primary').addClass('btn-warning');
    $(".create-button").html("Create");
    newTaskNameInput.value = "";
    newDescriptionInput.value = "";
    newAssignedToInput.value = "";
    newDueDateInput.value = "";
    taskManager.save();
    taskManager.render();
};
var tasksList = document.querySelector('#tasks');
tasksList.addEventListener('click', function (event) {
    var parentTask = event.target.parentElement.parentElement.parentElement;
    var taskId = parentTask.dataset.taskId;
    var task = taskManager.getTaskById(taskId);
    if (event.target.classList.contains('done-button')) {
        task.status = "DONE";
        taskManager.save();
        taskManager.render();
        return false;
    }
    if (event.target.classList.contains('delete-button')) {
        taskManager.deleteTask(taskId);
        taskManager.save();
        taskManager.render();
        return false;
    }
    if (event.target.classList.contains('edit')) {
        //You can't update the element unless you are done updating something else
        if ($(".create-button").html() == "Create") {
            parentTask = event.target.parentElement.parentElement;
            taskId = parentTask.dataset.taskId;
            task = taskManager.getTaskById(taskId);

            console.log(parentTask);
            $('#task-name').val(task.name);
            $('#description').val(task.description);
            $('#assigned-to').val(task.assignedTo);
            $('#due-date').val(task.dueDate);
            $(".create-button").html("UPDATE");
            $(".create-button").removeClass('btn-warning').addClass('btn-primary');
            //        task.status = "UPDATED"
            //        console.log(task)
            taskManager.deleteTask(taskId);
            taskManager.save();
            taskManager.render();
        } else {
            $('#update-alert').show();
            setTimeout(function () {
                $('#update-alert').hide();
            }, 3000);
        }
    }
});
document.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) $('.create-button').click();
});