import { wrapServiceError } from '../../../error/AppError'; 
import ITicketService from '../interface/ITicketService';
import ITicketRepository from '../../../repositories/tickets/interface/ITicketRepository';
import TicketMapper from '../../../mappers/ticket/TicketMapper';
import ITicketDTO from '../../../dtos/ticket/ITicketDTO';
import { extractUserIdFromToken } from '../../../utils/tokenUtils';

export default class TicketService implements ITicketService {
    private _ticketRepository: ITicketRepository;
    constructor(ticketRepository: ITicketRepository) {
        this._ticketRepository = ticketRepository;
    }

    async generateTicket(ticketData: Partial<ITicketDTO>): Promise<ITicketDTO> {
        try {
            const mappedData = TicketMapper.toModel(ticketData);

            const result = await this._ticketRepository.generateTicket(mappedData);

            const ticketDetails = TicketMapper.toITicketDTO(result);

            return ticketDetails;
        } catch (error) {
            throw wrapServiceError(error);
        }
    }

    async getTickets(accessToken: string): Promise<ITicketDTO[]> {
        try {
            const user_id = extractUserIdFromToken(accessToken);

            const result = await this._ticketRepository.getTickets(user_id);

            const ticketDetails = TicketMapper.toDTOs(result);

            return ticketDetails;
        } catch (error) {
            throw wrapServiceError(error);
        }
    }
}