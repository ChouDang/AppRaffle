import { a } from "@aws-amplify/backend";

export const ParticipationModel = a.model({
    ticketsPurchased: a.integer(), // số lượng vé mua 
    participationTime: a.datetime(), // thời gian mua 

    userId: a.id(),

    raffleId: a.id(),
    raffle: a.belongsTo('Raffle', 'raffleId'),  // lấy dữ liệu bảng Raffle thuộc về raffleId 
})