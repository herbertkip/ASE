
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_Secret = 'autonomoussecrets1234';

const verifyUser = { email: 'herbert@gmail.com', password: '123pass' };

app.post('/api/posts/', verifyToken, (req,res)=>{
    jwt.verify(req.token, JWT_Secret, (err,authData)=>{
       if(err){
           res.sendStatus(403);
       }
       else{
           res.json({
               message: 'Authentication was successful',
               authData
           })
       }
    });

});

app.post('/api/authenticate/', (req,res)=>{
	if ((verifyUser.email === req.body.email) && (verifyUser.password === req.body.password)){
		const user={
			id: 1,
			name:'Herbert',
			email:'herbert@gmail.com'
		};
	   jwt.sign({user}, JWT_Secret,(err, token)=>{
			res.json({token})
		});
	} else{
		res.sendStatus(403);
	}

});


//Format of the token
//Authorizations: Bearer <access_token>

//Verify token
function verifyToken(req,res,next){
    //get auth header value
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== "undefined"){

        //split at the space
        const bearer = bearerHeader.split(' ');

        //Get token from array
        const bearerToken = bearer[1];

        //set the token
        req.token = bearerToken;

        //next middle ware
        next();

    } else{
        res.sendStatus(403);
    }
}

app.listen(5000, ()=>{
    console.log("Server started on port 5000")
});