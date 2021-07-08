import Tasks from "./tasks.js";
import TaskServices from "./tasksServices.js";

const listTasks = new TaskServices();

const getEle = (id) => {
    return document.getElementById(id);
  };

const renderTasks = (arr) => {
    return arr.reduce((contentHTML, item)=>{
        return (contentHTML += `
        <li>
        <div class="singleTask">
            <div class="completeTask">
                <div class="complete-circle" id="complete-circle${item.id}" onclick="completeTask(${item.id})"></div>
                <svg class="success-svg" id="success${item.id}" onclick="unComplete(${item.id})" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 109 109" xml:space="preserve">
                    <polyline points="33.9,57.3 48,71.7 74.8,36.3 " class="success__check"  id="success__check${item.id}" style="stroke-dashoffset: 0;"></polyline>
                    <circle cx="54.3" cy="54.3" r="49.6" transform="rotate(220 55 55)" class="success__circle" id="success__circle${item.id}" style="stroke-dashoffset: 0;"></circle>
                </svg>
            </div>
            <span class="contentTask" id="contentTask${item.id}">${item.content}</span>
            <div class="delete">
                <button class="delBtn${item.id}" id="delBtn" onclick="delTask(${item.id})">
                    <svg class="delete-animation" id="del-animation${item.id}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="-2 -10 18 28">
                        <path class="lid" d="M10.5,2.3V1.5c0,0,0-0.1,0-0.1C10.5,0.6,9.8,0,9,0H6c0,0-0.1,0-0.1,0C5.1,0,4.5,0.7,4.5,1.5v0.8H0v1.5h15V2.3H10.5z M9,2.2  H6V1.5h3V2.2z"/>
                        <g class="can">
                            <path d="M12.8,3.8v12c0,0,0,0,0,0.1c0,0.4-0.4,0.7-0.8,0.7H3c0,0,0,0-0.1,0c-0.4,0-0.7-0.4-0.7-0.8v-12H0.8v12   c0,0.6,0.2,1.2,0.7,1.6C1.8,17.8,2.4,18,3,18h9c0,0,0,0,0,0c1.2,0,2.2-1,2.2-2.2v-12H12.8z"/>
                            <rect x="3.8" y="6" width="1.5" height="8.2"/>
                            <rect x="6.8" y="6" width="1.5" height="8.2"/>
                            <rect x="9.8" y="6" width="1.5" height="8.2"/>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    </li>
        `);
    },"");
}

const fetchData = () => {
    listTasks.getListTasksApi()
    .then((result) => {
    let todo = [];
    let completed = [];

      result.data.forEach((check) => {
        if (check.complete === false) {
          todo.push(check);
        } else {
          completed.push(check);
        }
      });

      getEle("todo").innerHTML = renderTasks(todo);
      getEle("completed").innerHTML = renderTasks(completed);
      getEle("newTask").value = "";
    })
    .catch ((error) =>{
        console.log(error);
    });
};
fetchData();

//Add Task
getEle("addItem").addEventListener("click",() => {
    const _content = getEle("newTask").value;
    const tasks = new Tasks("", _content, false);
    
    listTasks.addTaskApi(tasks)
    .then ((result)=>{
        fetchData();
//         console.log(result.data);
    })
    .catch ((error)=>{
        console.log(error);
    })
});

//Del Task
const delTask = (id) =>{
        listTasks.deleteTaskApi(id)
        .then ((result)=>{
//             console.log(id);
            getEle(`del-animation${id}`).animate = delAnimation(`${id}`);
            fetchData();
        })
        .catch ((error)=>{
            console.log(error);
        })
}
window.delTask = delTask;

//Update Task
const updateTask = (id, complete) => {
    let text = getEle("newTask").value;
  
    const task = new Task("", task, complete);
  
    listTasks.updateTasks(task)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
};
window.updateTask = updateTask;
  
//Complete
const completeTask = (id, content) => {
    let circle = getEle(`success__circle${id}`);
    let check = getEle(`success__check${id}`);
    getEle(`success${id}`).style.display="flex";
    getEle(`complete-circle${id}`).style.display = "none";
    getEle(`contentTask${id}`).style.textDecorationLine = "line-through";
    getEle(`contentTask${id}`).style.color="#aaa";
    getEle(`success${id}`).animate(
    Velocity(circle, { 'stroke-dashoffset': 400 }, 0),
    Velocity(circle, { 'stroke-dashoffset': 0 }, { duration: 300, delay: 250, easing: 'easeInQuad'}),
    Velocity(check, { 'stroke-dashoffset': 400 }, 0),
    Velocity(check, { 'stroke-dashoffset': 0 }, { duration: 400, delay: 0, easing: 'easeInQuint'}),
    )

    listTasks.getTaskApi(id)
    .then((result) => {
      let isCheck = false;
      if (isCheck === result.data.complete) {
        isCheck = true;
      }
      const tasks = new Tasks(id, content, isCheck);
      listTasks.updateTasks(tasks)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
window.completeTask = completeTask;

//Redo Complete
const unComplete = (id, content) =>{
    getEle(`success${id}`).style.display="none";
    getEle(`complete-circle${id}`).style.display="flex";
    getEle(`contentTask${id}`).style.textDecorationLine = "none";
    getEle(`contentTask${id}`).style.color="#000";

    listTasks.getTaskApi(id)
    .then((result) => {
      let isCheck = true;
      if (isCheck === result.data.complete) {
        isCheck = false;
      }
      const tasks = new Tasks(id, content, isCheck);
      listTasks.updateTasks(tasks)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}
window.unComplete = unComplete;

//Complete
getEle("one").addEventListener("click",()=>{
    getEle("todo").style.display = "none";
    getEle("hr").style.display = "none";
    getEle("completed").style.display = "block";
})

//A-Z
getEle("two").addEventListener("click", () => {
    const listTodo = document.getElementById("todo");
    const taskTodo = listTodo.getElementsByTagName("li");
    const todo = [];
    for (let i = 0; i < taskTodo.length; i++) {
      todo.push(taskTodo[i].getElementsByClassName("contentTask")[0].innerHTML);
    }
    todo.sort((a, b) => a.localeCompare(b));
    for (let i = 0; i < taskTodo.length; i++) {
      taskTodo[i].getElementsByClassName("contentTask")[0].innerHTML = todo[i];
    }
  
    const listCompleted = document.getElementById("completed");
    const taskCompleted = listCompleted.getElementsByTagName("li");
    const completed = [];
    for (var i = 0; i < taskCompleted.length; i++) {
      completed.push(taskCompleted[i].getElementsByClassName("contentTask")[0].innerHTML);
    }
    completed.sort((a, b) => a.localeCompare(b));
    for (let i = 0; i < taskCompleted.length; i++) {
      taskCompleted[i].getElementsByClassName("contentTask")[0].innerHTML = completed[i];
    }
  });
  
  //Z-A
  getEle("three").addEventListener("click", () => {
    const listTodo = document.getElementById("todo");
    const taskTodo = listTodo.getElementsByTagName("li");
    const todo = [];
    for (let i = 0; i < taskTodo.length; i++) {
      todo.push(taskTodo[i].getElementsByClassName("contentTask")[0].innerHTML);
    }
    todo.sort((a, b) => b.localeCompare(a));
    for (let i = 0; i < taskTodo.length; i++) {
      taskTodo[i].getElementsByClassName("contentTask")[0].innerHTML = todo[i];
    }
    const listCompleted = document.getElementById("completed");
    const taskCompleted = listCompleted.getElementsByTagName("li");
    const completed = [];
    for (var i = 0; i < taskCompleted.length; i++) {
      completed.push(taskCompleted[i].getElementsByClassName("contentTask")[0].innerHTML);
    }
    completed.sort((a, b) => b.localeCompare(a));
    for (let i = 0; i < taskCompleted.length; i++) {
      taskCompleted[i].getElementsByClassName("contentTask")[0].innerHTML = completed[i];
    }
  });
  
//All
getEle("all").addEventListener("click",()=>{
    getEle("todo").style.display = "block";
    getEle("hr").style.display = "block";
})



