"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/envConfig/envConfig");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const corsOptions_1 = __importDefault(require("./utils/corsOptions"));
const routes_1 = __importDefault(require("./routes/routes"));
const WebhookController_1 = __importDefault(require("./controllers/webhook/WebhookController"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions_1.default));
const webhookController = new WebhookController_1.default();
app.post('/api/v1/webhook', express_1.default.raw({ type: 'application/json' }), webhookController.stripeWebhook.bind(webhookController));
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.status(200).json('Server is up and Running');
});
exports.default = app;
