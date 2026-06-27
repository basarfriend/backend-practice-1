const express=require('express')
const app=express()
const fs=require('fs')
const path=require('path')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

// folder read karega
app.get('/',function (req,res) {
    fs.readdir('./files',function (err,files) {
        if (err) {
            console.log('error is ',err)
        }
        else{
            console.log('folder was read & /index open')
            res.render('index',{files:files})
        }
    })
})
// data backend par jaygi new files banegi
app.post('/create',function (req,res) {
    fs.writeFile(`./files/${req.body.tittle}.txt`,`desciption-- ${req.body.description}`,function (error) {
     if (error) {
        console.log('sorry for error',error)
     }  
     else{
        console.log('file created')
        res.redirect('/')
     } 
    })
})

// files ke andar ke content padhne ke liye route kiya jayega
app.get('/file/:filename',function (req,res) {
    // file readhogi fir route par bhejenge
    fs.readFile(`./files/${req.params.filename}`,'utf-8',function (err,filedata) {
        const taskname=req.params.filename
        const task={taskname,filedata}
        if (err) {
            console.log('error aya',err)
        }
        else{
            console.log('file read success')
            res.render('task',{task:task})
        }
    })
})
// file edit ke liye
app.post(`/file/:filename/edit`,function (req,res) {
   fs.rename(`./files/${req.params.filename}`,`./files/${req.body.tittle}.txt`,function (err) {
        if (err) {
            console.log('error hai ',err)
        }
        else{
            console.log('name change success')
            res.redirect('/')
        }
   })
})

// ab file delete ke liye
app.post('/:filename/delete',function (req,res) {
    fs.unlink(`./files/${req.params.filename}`,function (err) {
        if (err) {
            console.log('error hai ',err)
        }
        else{
            console.log('file deleted success')
            res.redirect('/')
        }
    })
})


// server create hogi
app.listen(5173)