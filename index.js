const port = 8080;
const mongoose = require("mongoose");
//const conn_str ="C"
const conn_str = "mongodb+srv://payal:payal@cluster0.nhykh.mongodb.net/students?retryWrites=true&w=majority";

mongoose.connect(conn_str, { useNewUrlParser: true , useUnifiedTopology: true})
	.then( () => console.log("Connected successfully...") )
	.catch( (err) => console.log(err) );


const userSchema = new mongoose.Schema({
	name: String,
	age: Number,
	city: String
});

const user = new mongoose.model("users", userSchema);


/** Express Mongoose Integration **/

const express = require("express");
var cors = require('cors');
const app = express();


//add middlewares
app.use(express.json());
app.use(cors());


app.route("/user")
.get(async (req, res) => {
	let data = await user.find();
	res.send(data);
})
.post(async (req, res) => {
	req_data = req.query;
	let obj = new user(req.query)
	let result = await obj.save();
	res.send(result);
})
.put(async (req, res) => {
	console.log(req.body);
	
	//model.updateOne({where}, {set});
	let u_data = await user.updateOne({"_id": req.body._id}, {
		"$set": {
			"name" : req.body.name,
			"age" : req.body.age,
			"city" : req.body.city
		}
	});
	
	res.send(u_data);
})
.delete(async (req, res) => {
	let d_data = await User.deleteOne({"_id": req.body._id});
	res.send(d_data);
})


app.listen(process.env.PORT || port, () => {
	console.log("listening 8080...");
});