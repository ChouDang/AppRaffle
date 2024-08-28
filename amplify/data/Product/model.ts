import { a } from "@aws-amplify/backend";

export const ProductModel = a.model({
    name: a.string(), // tên
    price: a.integer(), // giá

    raffle: a.hasMany('Raffle', 'productId'), // 1 : 1 với Raffle
})