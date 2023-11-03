const mongoose = require ("mongoose")
const taskSchema = mongoose.Schema(
    {
        lastname: {type: String, required: true},
        firstname:{ type: String,required:true},
        nationality: { type :String,required :false},
        blogs: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Books"
         }]
    }
)
module.exports = mongoose.model("Author", authorSchema)