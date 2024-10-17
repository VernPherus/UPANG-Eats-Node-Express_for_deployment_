class OrderItem {
    constructor(order_item_id, order_id, item_id, quantity, subtotal){
        this.order_item_id = order_item_id;
        this.order_id = order_id;
        this.item_id = item_id;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }
}
module.exports = OrderItem;