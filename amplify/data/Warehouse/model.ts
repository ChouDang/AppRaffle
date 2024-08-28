import { a } from "@aws-amplify/backend";

export const WarehouseModel = a.model({
    count: a.integer(), // số lượng trong kho
    status: a.enum(['stockLeft', 'outStock', 'block']), // trạng thái

    productId: a.id(),
    product: a.belongsTo('Product', 'productId')
})