import { Request, Response } from "express";

interface IAuthController {
    registerUser(request: Request, response: Response): Promise<void>;
}

export default IAuthController;
