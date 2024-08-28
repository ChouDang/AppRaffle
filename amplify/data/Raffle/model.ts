import { a } from "@aws-amplify/backend";

export const RaffleModel = a.model({
    description: a.string(), // mô tả Raffle
    startTime: a.datetime(), // thời gian bắt đầu bán vé
    endTime: a.datetime(), // thời gian kết thúc sau khi quay thưởng hoặc hủy raffle

    ticketsAvailable: a.integer(), // số lượng vé còn lại
    status: a.enum(['wait','drawing','done', 'cancel']), // trạng thái raffle

    participants: a.hasMany('Participation', 'raffleId'), // 1 : nhiều người tham gia
    results: a.hasOne('Result', 'raffleId'), // 1: 1 kết quả raffle

    productId: a.id(), // id sản phần trúng
    rewardProduct: a.belongsTo('Product', 'productId'), // chi tiết phần thưởng
})