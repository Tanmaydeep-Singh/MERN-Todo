const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE,PUT");

  next();
});

// mongoose.connect("mongodb+srv://Tanmaydeep:tanmay@cluster1.vcm3w.mongodb.net/newDB");
mongoose.connect("mongodb://localhost:27017/todoGDSC"); //Connecting with mongoose

const todoSchema = new mongoose.Schema({
  task: String,
});

const taskModel = mongoose.model("task", todoSchema);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/data", async (req, res) => {
  const data = await taskModel.find();
  res.send({ data, length: data.length });
});

app.post("/api/data", async (req, res) => {
  let newTask = new taskModel(req.body);
  newTask.save();
  res.send(newTask);
});

app.delete("/api/data/delete/:id", async (req, res) => {
  const data = await taskModel.findByIdAndDelete(req.params.id);
  res.send({ data });
});

app.put("/api/data/update/:id", async (req, res) => {
  const dataToUpdate = req.body;
  console.log(dataToUpdate);

  const data = await taskModel.findByIdAndUpdate(req.params.id, dataToUpdate);
  res.send({ data });
});

// Multi User Setup:

// const todoUserSchema = new mongoose.Schema({
//   user: [String, { task:String}]
// });
// const userModel = mongoose.model('user', todoUserSchema);

// app.get("/MultiUser", (req, res) => {
//   res.send("hello Multiuser world");
// });

// app.get("/MultiUser/api/data", async (req, res) => {
//   const data = await userModel.find();
//   res.send({ data, length: data.length });
// });

// app.post("/MultiUser/api/data", async (req, res) => {
//   let newTask = new userModel(req.body);
//   console.log("new task", newTask);

//   newTask.save();
//   res.send(newTask);
//  });

// app.delete("/MultiUser/api/data/delete/:id", async (req, res) => {
//   const data = await userModel.findByIdAndDelete(req.params.id);
//   res.send({ data });
// });

// app.put("/MultiUser/api/data/update/:id", async (req, res) => {
//   const dataToUpdate = req.body;
//   console.log(dataToUpdate);

//   const data = await taskModel.findByIdAndUpdate(req.params.id, dataToUpdate);
//   res.send({ data });
// });























// app.get('/api/lms/:id' , async(req,res)=>{
//   const data = await testModel.findById(req.params.id);
//   res.send({data })
// })

// app.put('/api/lms/:id' , async(req,res)=>{
//   const data = await testModel.findByIdAndUpdate(req.params.id,{completed:true});
//   res.send({data })
// })

// app.delete('/api/lms/:id' , async(req,res)=>{
//   const data = await testModel.findByIdAndDelete(req.params.id);
//   res.send({data })
// })
// app.post('/api/lms',async(req,res)=>{
//   let dataToSave = await testModel.create(req.body)
//   res.send(dataToSave)
// })

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
