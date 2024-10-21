const express = require('express')
const app = express();
const path = require('path');
app.use (express.json());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

const userModel = require("./models/user");

app.get('/', (req, res) => {
  res.render("index")
});

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render("read",{users});
  });

 app.get('/delete/:id', async (req,res) => {
  let users = await userModel.findOneAndDelete({_id: req.params.id});
  res.redirect("/read");
 });

  app.post('/create', async (req, res) => {

    let{name,email,url} = req.body;

  let createduser =  await userModel.create({
      name,
      email,
      url,
      
    });

    res.redirect("/read");
    
  });
  



  

app.listen(3000);




