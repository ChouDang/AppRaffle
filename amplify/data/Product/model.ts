import { a } from "@aws-amplify/backend";

export const ProductModel = a.model({
    id: a.id(),
    name: a.string(), // tên
    price: a.integer(), // giá

    raffleId: a.id(),
    raffle: a.belongsTo('Raffle', 'raffleId'),  // lấy dữ liệu bảng Raffle thuộc về raffleId 
})