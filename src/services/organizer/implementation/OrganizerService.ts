import { ServerError, ValidationError } from '../../../error/AppError';
import { ErrorMessages } from '../../../constants/errorMessages'; 
import { StatusCodes } from '../../../constants/statusCodes';
import { wrapServiceError } from '../../../error/AppError'; 
import IOrganizerService from '../interface/IOrganizerService';
import IOrganizerRepository from '../../../repositories/organizer/interface/IOrganizerRepository';

export default class OrganizerService implements IOrganizerService {
    private _organizerRepository: IOrganizerRepository;
    constructor(organizerRepository: IOrganizerRepository) {
        this._organizerRepository = organizerRepository;
    }

    async toggleUserRole(user_id: string, new_role: string): Promise<boolean> {
        try {
            if (!user_id || !new_role) {
                throw new ValidationError(ErrorMessages.MISSING_DETAILS, StatusCodes.INVALID_INPUT);
            }

            const isToggled = await this._organizerRepository.toggleUserRole(user_id, new_role);

            if (!isToggled) {
                throw new ServerError(ErrorMessages.ROLE_CHANGE_FAILED, StatusCodes.BAD_REQUEST);
            }

            return !!isToggled;
        } catch (error) {
            throw wrapServiceError(error);
        }
    }
}