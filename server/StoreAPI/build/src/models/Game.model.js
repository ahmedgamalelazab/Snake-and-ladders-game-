"use strict";
// it's a ladder and snake game, I have a user model wich represent a player, and I want to create a game model that will have a list of players, and a list of ladders and snakes, I'm not sure how to do that, should I create a new model for the ladders and snakes and reference them in the game model? or should I just create a list of ladders and snakes in the game model?
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var GameSchema = new mongoose_1.default.Schema({
    players: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
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
exports.GameModel = mongoose_1.default.model('Game', GameSchema);
