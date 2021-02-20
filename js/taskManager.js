const createTaskHtml = (name,description,assignedTo,dueDate,status,id) => {
    const display = status == "TODO" || status == "UPDATED" ? "" : "d-none";   
    const color = dueDate==="OVERDUE" && status === "TODO" ? "badge-danger" : status == "TODO" ? "badge-warning": status == "UPDATED" ? "badge-primary" : "badge-success"
    const html = `<li class="list-group-item">
                  <div class="animate__animated animate__bounce task" data-task-id=${id}>
                    <div class="task-top">
                      <div>
                        <span class="task-title">${name}</span></div>
                      <div><span class="badge badge-pill ${color} task-status">${status}</span></div>
                    </div>
                    <div class="task-desc position-relative">
                      <p>${description}</p>
                      <div style="position: absolute; bottom: 0; right: 10px" class="edit text-primary">edit</div>
                    </div>
                    <div class="task-bottom">
                      <div><span class="task-assign">Assigned to: ${assignedTo}</span>
                      </div>
                      <div>
                        <span class="${display} btn badge badge-success done-button">Done</span>
                      </div>
                      <div>
                        <span class="btn badge badge-danger delete-button">Delete</span>
                      </div>
                      <div><span class="task-date ${dueDate==="OVERDUE"?"text-light badge badge-danger":""}">${dueDate==="OVERDUE"? dueDate:"Due on " + dueDate}</span>
                      </div>
                    </div>
                  </div>
                </li>`
    return html;
}

class TaskManager {
    constructor(currentId=0) {
        this.tasks = []
        this._currentId=currentId
    }
    addTask(name,description,assignedTo,dueDate,status="TODO") {
        this.tasks.push({
            id: this._currentId,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        })
        this._currentId++;
    }
    render(selector='#tasks') {
        const tasksHtmlList = []
        this.tasks.forEach((e,i)=>{
            e.id=i
            const date = new Date(e.dueDate);
            let formattedDate;
            if (date > new Date()){
              formattedDate = date.toDateString();
            } else {
              formattedDate = "OVERDUE";
            }
            const taskHtml = createTaskHtml(e.name,e.description,e.assignedTo,formattedDate,e.status,i);
            tasksHtmlList.push(taskHtml);
        })
        const tasksHtml = tasksHtmlList.join("\n");
        $(selector).html(tasksHtml)
    }
    getTaskById(taskId) {
        let foundTask;
        this.tasks.forEach(e=>{
            const task = e
            if (task.id==taskId){
                foundTask = task
                }
        })
        return foundTask
    }
    save() {
        const tasksJson = JSON.stringify(this.tasks)
        localStorage.setItem('tasks',tasksJson); localStorage.setItem('currentID',JSON.stringify(this._currentId))
        const stateOfInputs = {
            name: $('#task-name').val(),
            description: $('#description').val(),
            assigned: $('#assigned-to').val(),
            due: $('#due-date').val(),
            button: $(".create-button").html(),
            btnClasses: document.querySelector('.create-button').classList.value
        }
        localStorage.setItem('inputs',JSON.stringify(stateOfInputs))
    }
    load() {
        if (localStorage.getItem('tasks') !== null){
            const tasksJson = localStorage.getItem('tasks')
            this.tasks = JSON.parse(tasksJson)
        }
        if (localStorage.getItem("currentID") !== null){
            this._currentId = +localStorage.getItem('currentID')
        }
        const inputs = JSON.parse(localStorage.getItem('inputs'))
        if (inputs) {
          $('#task-name').val(inputs.name)
          $('#description').val(inputs.description)
          $('#assigned-to').val(inputs.assigned)
          $('#due-date').val(inputs.due)
          $('.create-button').html(inputs.button)
          document.querySelector('.create-button').classList = inputs.btnClasses
        }
    }
    deleteTask (taskId) {
//        const newTasks = [] 
//        this.tasks.forEach(e=>{
//            if (e.id !== taskId) {
//                newTasks.push(e)
//            }
//        })
//        this.tasks = newTasks
        this.tasks.splice(taskId,1)
        this._currentId--
    }
}

module.exports = TaskManager
