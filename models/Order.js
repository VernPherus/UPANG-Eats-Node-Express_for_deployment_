class Order {
    constructor(order_id, user_id, stall_id, order_date, total_amount, order_status){
        this.order_id = order_id;
        this.user_id = user_id;
        this.stall_id = stall_id;
        this.order_date = order_date;
        this.total_amount = total_amount;
        this.order_status = order_status;
    }
}
module.exports = Order;