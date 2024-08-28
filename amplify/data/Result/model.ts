import { a } from "@aws-amplify/backend";

export const ResultModel = a.model({
    id: a.id(),
    dateTimeWinner: a.datetime(), 

    raffleId: a.id(),
    raffle: a.belongsTo('Raffle', 'raffleId'),

    winnerId: a.id(),
    winner: a.belongsTo('User', 'winnerId'),
})