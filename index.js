const express=require("express");
const mongoose=require("mongoose");
const app=express();

app.use(express.json());

const mongoURL = 'mongodb://127.0.0.1:27017/studentdata';

mongoose.connect(mongoURL,{});

const userSchema=new mongoose.Schema({
    name:String,
    age:String,
    grade:String
})

const studentsModel=mongoose.model('students',userSchema);

app.get("/", async (req, res) => {
    try {
        const students = await studentsModel.find({});
        res.send(students);
    } catch (err) {
        console.log(err);
    }
});

app.post("/studentdata",async(req,res)=>{
    try{
        const {name,age,grade}=req.body;
        const student=new studentsModel({name,age,grade});
        await student.save();
        res.send("student added successfully")
    }catch(err){
        console.log(err)
    }
})

app.post("/listofstudents",async(req,res)=>{
    try{
        const studentsdata=req.body;
        await studentsModel.insertMany(studentsdata);
        res.send("student added successfully")
    }catch(err){
        console.log(err);
    }
})

app.put("/studentdata/:id",async(req,res)=>{
    try{
        const studentId=req.params.id;
        const {name,age,grade}=req.body;
        const student=await studentsModel.findById(studentId);
        if (!student){
            return res.send("student not found")
        }

        if (name) student.name=name;
        if (age) student.age=age;
        if (grade) student.grade=grade;
        await student.save();
        res.send("student updated successfully");
    }catch(err){
        console.log(err)
    }
})

app.delete("/studentdata/:id",async(req,res)=>{
    try{
      const studentId=req.params.id;
      const result=await studentsModel.deleteOne({_id:studentId});
      if (result.deletedCount===0){
        return res.send("student not found");
      }
      res.send("student data deleted successfully");
    }catch(err){
        console.log(err);
    }
})

app.listen(4000,()=>{
    console.log("server running on 4000")
})