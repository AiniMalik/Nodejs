const express = require('express');
const jwt = require('jsonwebtoken')
const dbConnect = require('./db/config');
const User = require('./db/users');
const Student = require('./db/students');
const StudyGroup = require('./db/studyGroup')
const cors = require('cors')
const app = express();
const secretKey = "secretKey";
app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {     
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send(result);
});

app.post("/login", async (req, res) => {

       if (req.body.email && req.body.password) {
         let user = await User.findOne(req.body).select("-password");
         if (user) {
           jwt.sign(
             { user },
             secretKey,
             { expiresIn: "300s" },
             (err, token) => {
               res.json({
                 token,
                 user,
               });
             }
           );
         } else {
           res.status(404).send("user not found");
         }
       } else {
       res.status(404).send("user not found");
       } 
   
    
});

app.get("/students", async (req, res) => {
   let data = await Student.find();
    console.log(data)
    res.send(data);
});

app.get("/search-students/:key", async (req, res) => {
    let data = await Student.find(
        {
            "$or": [
                {"study_group":{$regex:req.params.key}}
            ]
        }
    )
    res.send(data);
});

app.put("/students-update/:id", async (req, res) => {
    let student = await Student.updateOne(
        {_id: req.params.id},
        {$set:req.body}
    )
    res.send({result: "updated"});
});
app.delete('/students-delete/:id', async (req, res) => {
    let student = await Student.deleteOne({ _id: req.params.id })
    res.send({ result: "deleted" }); 
});

app.post("/students", async (req, res) => {
    let student = new Student(req.body);
    let result = await student.save();
    res.send(result);
});
app.post("/study-groups", async (req, res) => {
  let group = new StudyGroup(req.body);
  let result = await group.save();
  res.send(result);
});
app.get("/study-groups", async (req, res) => {
  let group = await StudyGroup.find();
  res.send(group);
});
app.delete("/study-groups/:id", async (req, res) => {
  let group = await StudyGroup.deleteOne({_id: req.params.id});
  res.send({result:"deleted"});
});
app.listen(5000)
