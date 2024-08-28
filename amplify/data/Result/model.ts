import { a } from "@aws-amplify/backend";

export const ResultModel = a.model({
    dateTimeWinner: a.datetime(), 

    raffleId: a.id(),
    raffle: a.belongsTo('Raffle', 'raffleId'),

    winnerId: a.id(),
})