"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createTaskHtml = function createTaskHtml(name, description, assignedTo, dueDate, status, id) {
    var display = status == "TODO" || status == "UPDATED" ? "" : "d-none";
    var color = status == "TODO" ? "badge-warning" : status == "UPDATED" ? "badge-primary" : "badge-success";
    var html = "<li class=\"list-group-item\">\n                  <div class=\"animate__animated animate__bounce task\" data-task-id=" + id + ">\n                    <div class=\"task-top\">\n                      <div>\n                        <span class=\"task-title\">" + name + "</span></div>\n                      <div><span class=\"badge badge-pill " + color + " task-status\">" + status + "</span></div>\n                    </div>\n                    <div class=\"task-desc position-relative\">\n                      <p>" + description + "</p>\n                      <div style=\"position: absolute; bottom: 0; right: 10px\" class=\"edit text-primary\">edit</div>\n                    </div>\n                    <div class=\"task-bottom\">\n                      <div><span class=\"task-assign\">Assigned to: " + assignedTo + "</span>\n                      </div>\n                      <div>\n                        <span class=\"" + display + " btn badge badge-success done-button\">Done</span>\n                      </div>\n                      <div>\n                        <span class=\"btn badge badge-danger delete-button\">Delete</span>\n                      </div>\n                      <div><span class=\"task-date\">Due on " + dueDate + "</span>\n                      </div>\n                    </div>\n                  </div>\n                </li>";
    return html;
};

var TaskManager = function () {
    function TaskManager() {
        var currentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        _classCallCheck(this, TaskManager);

        this.tasks = [];
        this._currentId = currentId;
    }

    _createClass(TaskManager, [{
        key: "addTask",
        value: function addTask(name, description, assignedTo, dueDate) {
            var status = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "TODO";

            this.tasks.push({
                id: this._currentId,
                name: name,
                description: description,
                assignedTo: assignedTo,
                dueDate: dueDate,
                status: status
            });
            this._currentId++;
        }
    }, {
        key: "render",
        value: function render() {
            var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#tasks';

            var tasksHtmlList = [];
            this.tasks.forEach(function (e, i) {
                e.id = i;
                var date = new Date(e.dueDate);
                var formattedDate = date.toDateString();
                var taskHtml = createTaskHtml(e.name, e.description, e.assignedTo, formattedDate, e.status, i);
                tasksHtmlList.push(taskHtml);
            });
            var tasksHtml = tasksHtmlList.join("\n");
            $(selector).html(tasksHtml);
        }
    }, {
        key: "getTaskById",
        value: function getTaskById(taskId) {
            var foundTask = void 0;
            this.tasks.forEach(function (e) {
                var task = e;
                if (task.id == taskId) {
                    foundTask = task;
                }
            });
            return foundTask;
        }
    }, {
        key: "save",
        value: function save() {
            var tasksJson = JSON.stringify(this.tasks);
            localStorage.setItem('tasks', tasksJson);localStorage.setItem('currentID', JSON.stringify(this._currentId));
            var stateOfInputs = {
                name: $('#task-name').val(),
                description: $('#description').val(),
                assigned: $('#assigned-to').val(),
                due: $('#due-date').val(),
                button: $(".create-button").html(),
                btnClasses: document.querySelector('.create-button').classList.value
            };
            localStorage.setItem('inputs', JSON.stringify(stateOfInputs));
        }
    }, {
        key: "load",
        value: function load() {
            if (localStorage.getItem('tasks') !== null) {
                var tasksJson = localStorage.getItem('tasks');
                this.tasks = JSON.parse(tasksJson);
            }
            if (localStorage.getItem("currentID") !== null) {
                this._currentId = +localStorage.getItem('currentID');
            }
            var inputs = JSON.parse(localStorage.getItem('inputs'));
            if (inputs) {
                $('#task-name').val(inputs.name);
                $('#description').val(inputs.description);
                $('#assigned-to').val(inputs.assigned);
                $('#due-date').val(inputs.due);
                $('.create-button').html(inputs.button);
                document.querySelector('.create-button').classList = inputs.btnClasses;
            }
        }
    }, {
        key: "deleteTask",
        value: function deleteTask(taskId) {
            //        const newTasks = [] 
            //        this.tasks.forEach(e=>{
            //            if (e.id !== taskId) {
            //                newTasks.push(e)
            //            }
            //        })
            //        this.tasks = newTasks
            this.tasks.splice(taskId, 1);
            this._currentId--;
        }
    }]);

    return TaskManager;
}();

module.exports = TaskManager;