import { Request, Response } from 'express';

export default interface IOrganizerController {
    toggleUserRole(request: Request, response: Response): Promise<void>;
    createEvent(request: Request, response: Response): Promise<void>;
    updateEvent(request: Request, response: Response): Promise<void>;
    deleteEvent(request: Request, response: Response): Promise<void>;
    getAllEvents(request: Request, response: Response): Promise<void>;
    getAllUsers(request: Request, response: Response): Promise<void>;
}
