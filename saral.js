var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(express.json())

// task-1

app.get('/courses1', function(req, res){
    let data = fs.readFileSync('courses1.json')
        let b = JSON.parse(data)
        // console.log(b)
        res.send(b)
})

// task-2 

app.post('/courses1', function(req, res){
    courses = req.body
    // console.log(courses)
    fs.readFile( __dirname + "/" + "courses1.json", function(err, data){
        if (err){
            res.send("check your json file");
        }else{
            var data = JSON.parse(data); 
            var courses = {
                name: req.body.name,
                description: req.body.description,
            }
            courses.id = data.length + 1
            data.push(courses);
            fs.writeFile( __dirname + "/" + "courses1.json", JSON.stringify(data,null,2))
                return res.json(courses)
            //     return res.json("sucess")
            //     // console.log("sucess");
            
        }
    })
})


// // task-3


app.get("/courses1/:id" , function(req , res){
    fs.readFile("courses1.json" , function(err , data){
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++){
            if (data[i]['id']==req.params.id){
                var user_id = data[i];
                console.log(user_id);
                res.send(JSON.stringify(user_id));
            }
        }
    })
})
 
// //  task-4

app.put('/courses1/:id', function(req, res){
    fs.readFile(__dirname + "/courses1.json",(err, data)=>{

        var data1 = JSON.parse(data);
        console.log(data1);
        for (var i of data1){

            if(i.id == req.params.id){
                if(req.body.hasOwnProperty("name")){
                    i.name = req.body.name;
                }
                if (req.body.hasOwnProperty("description")){
                    i.description = req.body.description;
                }
            }
        }
        console.log(data1)
        fs.writeFile( __dirname + "/courses1.json", JSON.stringify(data1,null,2));
            return res.json(i);

       
    });
})

// // task-5

app.get("/courses1/:id/exercise", function(req,res){
    fs.readFile(__dirname+"/courses1.json" , (err,data)=> {
        var course = JSON.parse(data);
        var userDetails = course[req.params.id-1].exercise
        console.log(userDetails)
        return res.json(userDetails)
    })
})
// // task-6

app.post('/courses1/:id/exercise',(req,res)=>{
   
    var exercises={
        courseId:req.params.id,
        name:req.body.name,
        content:req.body.content,
        hint:req.body.hint
    }
    var data=fs.readFileSync(__dirname + "/courses1.json");
    data=data.toString();
    var courses=JSON.parse(data)
    console.log(courses)
    exercises.id=courses[req.params.id-1].exercise.length+1;
    courses[req.params.id-1].exercise.push(exercises)
    fs.writeFileSync('courses1.json',JSON.stringify(courses,null,2));
    return res.json(courses);

});

// // task-7

app.get('/courses1/:id/exercise/:Id',(req,res)=>{
    fs.readFile(__dirname + "/courses1.json",(err,data)=>{
        var courses=JSON.parse(data);
        var userDetails=courses[req.params.id-1].exercise[req.params.Id-1];
        return res.json(userDetails);
    })
});

// // task-8

app.put('/courses1/:id/exercise/:Id',(req,res)=>{
    fs.readFile(__dirname + '/courses1.json',(err,data)=>{
        var courses = JSON.parse(data);
        // console.log(courses)
        var userDetails = courses[req.params.id-1].exercise[req.params.Id-1];
        if(userDetails.hasOwnProperty('name')){
            userDetails.name=req.body.name;
        }
        if(userDetails.hasOwnProperty('hint')){
            userDetails.hint = req.body.hint;
        }
        fs.writeFileSync('courses1.json',JSON.stringify(courses,null,2));
        return res.json(courses);
    });
});

// // task-9

app.get('/courses1/:id/exercise/:Id/submissions',(req,res)=>{
    fs.readFile(__dirname + '/courses1.json',(err,data)=>{
        var courses = JSON.parse(data);
        // console.log("yaha tak chal rha hai"); 
        var userDetails=courses[req.params.id-1].exercise[req.params.Id-1];
        if(userDetails.hasOwnProperty('submission')){
            return res.json(userDetails.submission)
        }
        else{
            courses[req.params.id-1].exercise[req.params.Id-1].submission=[];
            fs.writeFileSync('courses1.json',JSON.stringify(courses,null,2))
            return res.json(courses)
        }       
    });
});

app.post("/courses1/:id/exercise/:Id/submissions", (req,res) =>{
    var subms= {
        courseId:req.params.id,
        exerciseId:req.params.Id,
        user_name:req.body.user_name,
        content:req.body.content
    }
    var data = fs.readFileSync(__dirname+"/courses1.json");
    data = data.toString();
    var courses = JSON.parse(data);
    subms.id=courses[req.params.id-1].exercise[req.params.Id-1].submission.length+1;
    courses[req.params.id-1].exercise[req.params.Id-1].submission.push(subms);
    fs.writeFileSync('courses1.json',JSON.stringify(courses,null,2));
    return res.json(courses);
});


var server = app.listen(4075, function(){
    var host = server.address().address
    var port = server.address().port
    console.log(host, port)
})
