
interface IStripeRequestDTO {
    user_id: string,
    event_id: string,
    amount: number,
    currency: string,
    type: string,
}

export default IStripeRequestDTO;