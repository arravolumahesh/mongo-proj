const express=require("express");
const axios=require("axios");

const app=express();

app.get("/users", (req, res) => {
    axios.get("https://reqres.in/api/users")
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  app.get("/get/:id",(req,res)=>{
    const getId=req.params.id;
    axios.get(`https://reqres.in/api/users/${getId}`)
    .then(response=>{
        res.json(response.data);
    })
    .catch(error=>{
        res.status(500).json({ error: "Internal Server Error" });
    })
  })
  
const postdata={
    
        "id": 7,
        "email": "ramos@reqres.in",
        "first_name": "Trancy",
        "last_name": "Ram",
        "avatar": "https://reqres.in/img/faces/6-image.jpg"
}
  app.post("/posts", (req, res) => {
    axios.post("https://reqres.in/api/users", postdata)
      .then(response => {
        res.status(201).json(response.data);
      })
      .catch(error => {
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  const updatedData={
    
    "email": "mahi@reqres.in",
    "first_name": "arr",
    "last_name": "mahi",
    "avatar": "https://reqres.in/img/faces/6-image.jpg"
}
  app.put("/update/:id", (req, res) => {
    const postId = req.params.id;
    axios.put(`https://reqres.in/api/users/${postId}`, updatedData)
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  app.delete("/delete/:id",(req,res)=>{
    const delId=req.params.id;
    axios.delete(`https://reqres.in/api/users/${delId}`)
    .then(response=>{
        res.json(response.data);
    })
    .catch(error=>{
        res.status(500).json({ error: "Internal Server Error" });
    })
  })

  
app.listen(4000,()=>{
    console.log("port run on 4000");
})