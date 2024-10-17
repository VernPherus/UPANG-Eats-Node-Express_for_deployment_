class Stall {
    constructor(stall_id, stall_name, owner_id, description, contact_number, image_url, image_banner_url, is_active){
        this.stall_id = stall_id;
        this.stall_name = stall_name;
        this.owner_id = owner_id;
        this.description = description;
        this.contact_number = contact_number;
        this.image_url = image_url;
        this.image_banner_url = image_banner_url;
        this.is_active = is_active;
    }
}
module.exports = Stall;