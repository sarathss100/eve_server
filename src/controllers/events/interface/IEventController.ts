import { Request, Response } from 'express';

export default interface IEventController {
    getAllEvents(request: Request, response: Response): Promise<void>;
}