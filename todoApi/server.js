const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("todo.proto");


const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;


const server = new grpc.Server()

server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

server.addService(todoPackage.Todo.service, {
    "createTodo": createTodo,
    "readTodos": readTodos,

    "readTodosStream": readTodosStream,
    "updateTodo": updateTodo,
    "deleteTodo": deleteTodo
})


server.start();
//!this is an example storage ....naturally this will be a database 
const todos = []

function createTodo(todocall, callback) {

    const todoItem = {
        "id": todos.length + 1,
        "text": todocall.request.text,
        "dateCompleted": todocall.request.dateCompleted,
        "isCompleted": todocall.request.isCompleted,
    };
    todos.push(todoItem);
    callback(null, todoItem);
}

function readTodosStream(call, callback) {

    todos.forEach(todo => call.write(todo));
    call.end();
}


function readTodos(call, callback) {
    callback(null, {
        "todos": todos
    });
}


function updateTodo(todocall, callback) {


    todos[todocall.request.id] = todocall.request

    callback(null, todocall.request);
}

function deleteTodo(call, callback) {
    if (call.request.index != null) {
        newTods = todos.filter(item => item.id != call.request.index);
        todos = newTods;
        callback(null, null)
    }
}