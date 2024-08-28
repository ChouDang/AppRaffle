import { a } from "@aws-amplify/backend";

export const ResultModel = a.model({
    winnerId: a.id(),
    dateTimeWinner: a.datetime(), 

    raffleId: a.id(),
    raffle: a.belongsTo('Raffle', 'raffleId'),
})