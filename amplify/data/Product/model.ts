import { a } from "@aws-amplify/backend";

export const ProductModel = a.model({
    name: a.string(), // tên
    price: a.integer(), // giá

    raffle: a.hasMany('Raffle', 'productId'), // 1 : nhiều với Raffle
    warehouse: a.hasOne('Warehouse', 'productId')  // 1 : 1 nhiều với warehouse
})