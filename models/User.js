class User {
    constructor(user_id, student_id, first_name, last_name, email, password, phone_number, user_type){
        this.user_id = user_id;
        this.student_id = student_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.user_type = user_type;
    }
}
module.exports = User;