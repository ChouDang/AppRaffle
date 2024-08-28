import { a } from "@aws-amplify/backend";

export const ResultModel = a.model({
    dateTimeWinner: a.datetime(), 

    raffleID: a.id(),
    raffle: a.belongsTo('Raffle', 'raffleID'),

    winnerID: a.id(),
    winner: a.belongsTo('User', 'winnerID'),
})