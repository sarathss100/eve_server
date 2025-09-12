import { Request, Response } from 'express';

export default interface IOrganizerController {
    toggleUserRole(request: Request, response: Response): Promise<void>;
}
