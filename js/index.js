const taskManager = new TaskManager()
taskManager.load()
taskManager.render()
const validFormFieldInput = () => {
    const newTaskNameInput = document.querySelector('#task-name')   ;
    const name = newTaskNameInput.value;
    const newDescriptionInput = document.querySelector('#description');
    const description = newDescriptionInput.value;
    const newAssignedToInput = document.querySelector('#assigned-to');
    const assignedTo = newAssignedToInput.value;
    const newDueDateInput = document.querySelector('#due-date');
    const dueDate = newDueDateInput.value;
    if (name===""){
        $('#name-alert').show()
        setTimeout(()=>{$('#name-alert').hide()},2000)
        $('#task-name').focus()
        return false;
    }
    if (description==="") {
        $('#descrip-alert').show()
        setTimeout(()=>{$('#descrip-alert').hide()},2000)
        $('#description').focus()
        return false;
    }
    if (assignedTo===""){
        $('#assigned-alert').show()
        setTimeout(()=>{$('#assigned-alert').hide()},2000)
        $('#assigned-to').focus()
        return false;
    }
    if (dueDate === ""){
        $('#due-alert').show()
        setTimeout(()=>{$('#due-alert').hide()},2000)
        $('#due-date').focus()
        return false;
    }
    taskManager.addTask(name,description,assignedTo,dueDate,$('.create-button').html()=="UPDATE"?"UPDATED":"TODO")
    $('.create-button').removeClass('btn-primary').addClass('btn-warning')
    $(".create-button").html("Create")
    newTaskNameInput.value = ""
    newDescriptionInput.value = ""
    newAssignedToInput.value = ""
    newDueDateInput.value = ""
    taskManager.save()
    taskManager.render()
}
const tasksList = document.querySelector('#tasks');
tasksList.addEventListener('click',(event) => {
        let parentTask = event.target.parentElement.parentElement.parentElement
        let taskId = parentTask.dataset.taskId
        let task = taskManager.getTaskById(taskId)
    if (event.target.classList.contains('done-button')){
        task.status = "DONE"
        taskManager.save()
        taskManager.render()
        return false;
    }
    if (event.target.classList.contains('delete-button')){
        taskManager.deleteTask(taskId)
        taskManager.save()
        taskManager.render()
        return false;
    }
    if (event.target.classList.contains('edit')){
        //You can't update the element unless you are done updating something else
        if ($(".create-button").html() == "Create") {
        parentTask = event.target.parentElement.parentElement
        taskId = parentTask.dataset.taskId
        task = taskManager.getTaskById(taskId)

        console.log(parentTask)
        $('#task-name').val(task.name)
        $('#description').val(task.description)
        $('#assigned-to').val(task.assignedTo)
        $('#due-date').val(task.dueDate)
        $(".create-button").html("UPDATE")
        $(".create-button").removeClass('btn-warning').addClass('btn-primary')
//        task.status = "UPDATED"
        console.log(task)
        taskManager.deleteTask(taskId)
        taskManager.save()
        taskManager.render()
        } else {
            $('#update-alert').show()
            setTimeout(()=>{$('#update-alert').hide()},3000)
        }
    }
})
document.addEventListener('keyup',(e)=>{
    if (e.keyCode===13)$('.create-button').click()
})