const mongoose=require("mongoose")

const connection =mongoose.connect("mongodb+srv://asif:patel@cluster0.lpppoo8.mongodb.net/olx?retryWrites=true&w=majority");

module.exports={
    connection
}