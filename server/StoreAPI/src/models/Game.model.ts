// it's a ladder and snake game, I have a user model wich represent a player, and I want to create a game model that will have a list of players, and a list of ladders and snakes, I'm not sure how to do that, should I create a new model for the ladders and snakes and reference them in the game model? or should I just create a list of ladders and snakes in the game model?

import mongoose from 'mongoose';


const GameSchema = new mongoose.Schema({
    players: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'in-progress',
        enum: ['in-progress', 'finished', 'cancelled', 'paused'],
    },
}, {
    timestamps: true,
});

export const GameModel = mongoose.model('Game', GameSchema);


