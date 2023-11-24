const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
            name:String,
            email:{
                type:String,
                lowercase:true
            },
            pass:String,
            pno:String,
            add:String,
            prod_ord:Array,
            prod_post:Array
});



const userModel = mongoose.model('user',userSchema);

module.exports = userModel;