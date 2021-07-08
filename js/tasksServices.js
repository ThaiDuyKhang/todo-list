export default class TaskServices {
    addTaskApi(data){
        return axios ({
            url:"https://60bc9aceb8ab37001759f4cc.mockapi.io/api/Todo-list",
            method: "POST",
            data,
        });
    }

    getListTasksApi(){
        return axios ({
            url:"https://60bc9aceb8ab37001759f4cc.mockapi.io/api/Todo-list",
            method: "GET",
        });
    }
    deleteTaskApi(id){
        return axios ({
            url:`https://60bc9aceb8ab37001759f4cc.mockapi.io/api/Todo-list/${id}`,
            method:"DELETE",
        })
    }

    getTaskApi(id){
        return axios ({
            url: `https://60bc9aceb8ab37001759f4cc.mockapi.io/api/Todo-list/${id}`,
            method: "GET",
        })
    }
    updateTasks(data){
        return axios({
            url:`https://60bc9aceb8ab37001759f4cc.mockapi.io/api/Todo-list/${data.id}`,
            method:'PUT',
            data,
        });
    }
}