const express=require('express');
const app=express();
app.use(express.json())

let initialTodo = [{title:"HTML",isCompleted:true,id:1},{title:"javascript",isCompleted:true,id:2},{title:"React",isCompleted:false,id:3}]

// get
app.get("/todos",(req,res)=>{
    res.send(initialTodo)
})
app.get("/",(req,res)=>{
    res.status(200).send("welcome to the todo api")
})

// post

app.post("/addtodo",(req,res)=>{
   console.log(req.body);

    let newTodos = {
        title :req.body.title,
        isCompleted: req.body.isCompleted,
        id:initialTodo.length+1,
    };
    initialTodo.push(newTodos);
    res.send(newTodos);

})

// update

app.patch("/update/:id",(req,res)=>{
    let{id}=req.params   
    console.log(id);
    let index=initialTodo.findIndex((initialTodo)=>initialTodo.id == id)
    if(index == -1){
        res.status(404).send('update not found');
    }
    else{
        initialTodo[index]=req.body
        
    }
    res.status(200).send(initialTodo[index])

})

// delete

app.delete("/delete/:id",(req,res)=>{
    let{id}=req.params;
    let index = initialTodo.findIndex((ele)=>ele.id ==id);
    let deletedTodo = initialTodo.splice(index,1)[0]
    console.log(deletedTodo)
    res.send({deletedTodo:deletedTodo})

});

// filter

app.get("/findbystatus", (req, res) => {
    let status = req.query.isCompleted;
    let todos = status === "true";
    if (status == "true") {
      const a = initialTodo.filter(
        (initialTodo) => initialTodo.isCompleted == todos
      );
      res.send(a);
    } else if (status == "false") {
      const b = initialTodo.filter(
        (initialTodo) => initialTodo.isCompleted == todos
      );
      res.send(b);
    }
  });

app.listen(8090,()=>{
    console.log("Express port 8090")
})
