import * as mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const pactSchema = new mongoose.Schema({
    name: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    private: Boolean,
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    password: String,
    date_created: Date,
    weigh_date: {type: String, default: 'Sunday'},
    board: {
        exercises: [postSchema],
        recipes: [postSchema]
    }
});

const Pact = mongoose.model('Pact', pactSchema);

export default Pact;
