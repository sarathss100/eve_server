import OrganizerController from '../../../controllers/organizer/implementation/OrganizerController';
import IOrganizerController from '../../../controllers/organizer/interface/IOrganizerController';
import OrganizerRepository from '../../../repositories/organizer/implementation/OrganizerRepository';
import OrganizerService from '../../../services/organizer/implementation/OrganizerService';
import createOrganizerRouter from './OrganizerRouter';

class OrganizerContainer {
    public readonly controller: IOrganizerController;
    public readonly router: ReturnType<typeof createOrganizerRouter>;

    constructor() {
        const repository = new OrganizerRepository();
        const service = new OrganizerService(repository);
        this.controller = new OrganizerController(service);
        this.router = createOrganizerRouter(this.controller);
    }
}

export default OrganizerContainer;