const mongoose = require("mongoose");

function connectDB(){

    mongoose.connect('mongodb+srv://mca2333:cLZ3N6Qi56bwph1k@cluster0.f1xnqhb.mongodb.net/carRental' , {useUnifiedTopology: true , useNewUrlParser: true})
    
    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose