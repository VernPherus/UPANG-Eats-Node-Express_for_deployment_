class Transaction {
    constructor(transaction_id, user_id, transaction_type, amount, source_id, destination_id, transaction_date, status, description){
        this.transaction_id = transaction_id;
        this.user_id = user_id;
        this.transaction_type = transaction_type;
        this.amount = amount;
        this.source_id = source_id;
        this.destination_id = destination_id;
        this.transaction_date = transaction_date;
        this.status = status;
        this.description = description;
    }
}
module.exports = Transaction;