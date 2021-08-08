const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
//!load the proto file
const packageDef = protoLoader.loadSync("todo.proto");


const grpcObject = grpc.loadPackageDefinition(packageDef);

const todoPackage = grpcObject.todoPackage;

const dynamictext = process.argv[2];
const Client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure());




// Client.createTodo({
//     "id": -1,
//     "text": dynamictext,
//     "dateCompleted": new Date().toISOString(),
//     "isCompleted": false
// }, (err, resp) => {
//     if (!err) {
//         console.log("Recieved from Server: " + JSON.stringify(resp))
//     } else {
//         console.error("Recieved error from Server: " + err)
//     }

// })


Client.readTodos(null, (err, resp) => {
    if (!err) {
        console.log("read from Server: " + JSON.stringify(resp))
    } else {
        console.error("Recieved error from Server: " + err)
    }
})

// const call = Client.readTodosStream();
// call.on("data", item => {
//     console.info("Stream from Server: " + JSON.stringify(item))
// });
// call.on("end", e => console.info("Server is Done"))


// Client.updateTodo({
//     "id": 4,
//     "text": dynamictext,
//     "dateCompleted": new Date().toISOString(),
//     "isCompleted": true
// }, (err, resp) => {
//     if (!err) {
//         console.log("Recieved from Server: " + JSON.stringify(resp))
//     } else {
//         console.error("Recieved error from Server: " + err)
//     }

// })


Client.deleteTodo({
    "index": dynamictext.length == 0 ? null : dynamictext
}, (err, resp) => {
    if (!err) {
        console.log("Recieved from Server: " + JSON.stringify(resp))
    } else {
        console.error("Recieved error from Server: " + err)
    }

})