import { a } from "@aws-amplify/backend";

export const ProductModel = a.model({
    id: a.id(),
    name: a.string(), // tên
    price: a.integer(), // giá

    raffle: a.hasOne('Raffle', 'productId'), // 1 : 1 với Raffle
})