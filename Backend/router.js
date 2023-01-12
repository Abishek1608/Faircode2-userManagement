const express =require("express");
const app =express();
const router = express.Router();
const infoSchema = require("./infoschema");
const user = require("./user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const cors =require("cors");

router.use(express.json());
router.use(cors());


router.use("/", (req, res, next) => {
    try {
      if (req.path == "/login" || req.path == "/register" || req.path == "/") {
        next();
      } else {
        /* decode jwt token if authorized*/
        jwt.verify(req.headers.token, 'shhhhh11111', function (err, decoded) {
          if (decoded && decoded.user) {
            req.user = decoded;
            next();
          } else {
            return res.status(401).json({
              errorMessage: 'User unauthorized!',
              status: false
            });
          }
        })
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
  })


  router.post("/login", (req, res) => {
    try {
      if (req.body && req.body.username && req.body.password) {
        user.find({ username: req.body.username }, (err, data) => {
          if (data.length > 0) {
  
            if (bcrypt.compareSync(data[0].password, req.body.password)) {
              checkUserAndGenerateToken(data[0], req, res);
            } else {
  
              res.status(400).json({
                errorMessage: 'Username or password is incorrect!',
                status: false
              });
            }
  
          } else {
            res.status(400).json({
              errorMessage: 'Username or password is incorrect!',
              status: false
            });
          }
        })
      } else {
        res.status(400).json({
          errorMessage: 'Add proper parameter first!',
          status: false
        });
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
  
  });

  app.post("/register", (req, res) => {
    try {
      if (req.body && req.body.username && req.body.password) {
  
        user.find({ username: req.body.username }, (err, data) => {
  
          if (data.length == 0) {
  
            let User = new user({
              username: req.body.username,
              password: req.body.password
            });
            User.save((err, data) => {
              if (err) {
                res.status(400).json({
                  errorMessage: err,
                  status: false
                });
              } else {
                res.status(200).json({
                  status: true,
                  title: 'Registered Successfully.'
                });
              }
            });
  
          } else {
            res.status(400).json({
              errorMessage: `UserName ${req.body.username} Already Exist!`,
              status: false
            });
          }
  
        });
  
      } else {
        res.status(400).json({
          errorMessage: 'Add proper parameter first!',
          status: false
        });
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
  });

  function checkUserAndGenerateToken(data, req, res) {
    jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
      if (err) {
        res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        res.json({
          message: 'Login Successfully.',
          token: token,
          status: true
        });
      }
    });
  }

//create 
router.post('/',async(req, res)  =>{
    console.log(req.body);
    const data = new infoSchema({
                Name:req.body.Name,
                Age:req.body.Age,
                city:req.body.city
            });
            await data.save();
            res.json(data);
  })


//   getall

router.get("/",async(req,res) =>{
    const findData = await infoSchema.find();
    res.json(findData);

})

//update

router.put("/update",async(req,res) =>{
    const update = await infoSchema.updateMany({_id:req.body._id},{$set:{
        Name:req.body.Name,
        Age:req.body.Age,
        city:req.body.city
    }});
    res.json(update);
})


router.delete("/del/:id",async(req,res) =>{
    const delData =await infoSchema.findByIdAndRemove(req.params.id).then(e=>{
        res.json({message:"Deleted successfully"}); 
    })
})
// router.post("/",async(req,res,user)=>{
//     try {
//         const Name = new infoSchema({ Name: req.body.Name });
//         if (!user) {
//             return res.status(404).send("user not found");
//         }
//         const Age = new infoSchema({ Age: req.body.Age });
//         if (!user) {
//             return res.status(404).send("user not found");
//         }
//         const city = new infoSchema({ city: req.body.city });
//         if (!user) {
//             return res.status(404).send("user not found");
//         }
//         return res.status(200).json(user);
//     }
//     catch (err) {
//             console.log(err);
//             return res.status(500).send(err.message);
//           }

// })
// //     console.log(request.body);
// //     var data = new infoSchema({
// //         Name:request.body,
// //         Age:request.body,
// //         city:request.body
// //     })
// // })




router.get("/",(req,res) =>{
    res.json("i am router file");
})

module.exports = router;