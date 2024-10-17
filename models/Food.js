class Food {
    constructor(item_id, stall_id, item_name, description, price, image_url, is_available, is_breakfast, is_lunch, is_merienda){
        this.item_id = item_id;
        this.stall_id = stall_id;
        this.item_name = item_name;
        this.description = description;
        this.price = price;
        this.image_url = image_url;
        this.is_available = is_available;
        this.is_breakfast = is_breakfast;
        this.is_lunch = is_lunch;
        this.is_merienda = is_merienda;
    }
}
module.exports = Food;