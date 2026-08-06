"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const patients = [
    {
        id: '1',
        name: 'John Doe',
        occupation: 'Engineer',
        gender: 'male',
        ssn: '123-45-6789',
        dateOfBirth: '1990-01-01'
    },
    {
        id: '2',
        name: 'Jane Smith',
        occupation: 'Teacher',
        gender: 'female'
    }
];
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.get('/api/patients', (_req, res) => {
    res.json(patients);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
