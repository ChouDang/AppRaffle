import { a } from "@aws-amplify/backend";

export const ParticipationModel = a.model({
    id: a.id(),
    ticketsPurchased: a.integer(), // số lượng vé mua 
    participationTime: a.datetime(), // thời gian mua 

    userId: a.id(),
    user: a.belongsTo('Users', 'userId' ), // lấy dữ liệu bảng Users thuộc về userId 

    raffleId: a.id(),
    raffle: a.belongsTo('Raffle', 'raffleId'),  // lấy dữ liệu bảng Raffle thuộc về raffleId 
})