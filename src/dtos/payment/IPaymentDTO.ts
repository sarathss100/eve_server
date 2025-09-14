
interface IPaymentDTO {
    _id?: string,
    payment_id: string;
    ticket_id: string;
    amount: number;
    payment_method: 'online' | 'offline';
    payment_status: 'pending' | 'paid' | 'refunded';
    paid_date: Date | undefined;
}

export default IPaymentDTO;