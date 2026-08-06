"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const patientService_1 = __importDefault(require("./services/patientService"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.get('/api/patients', (_req, res) => {
    res.json(patientService_1.default.getNonSensitivePatients());
});
app.get('/api/diagnoses', (_req, res) => {
    res.json(patientService_1.default.getDiagnoses());
});
app.post('/api/patients', (req, res) => {
    try {
        const newPatient = patientService_1.default.addPatient(req.body);
        res.json(newPatient);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(400).json({ error: 'Invalid request data' });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
