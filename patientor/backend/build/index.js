"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const patientService_1 = __importDefault(require("./services/patientService"));
const types_1 = require("./types");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api/ping", (_req, res) => {
    res.send("pong");
});
app.get("/api/patients", (_req, res) => {
    res.json(patientService_1.default.getNonSensitivePatients());
});
app.get("/api/diagnoses", (_req, res) => {
    res.json(patientService_1.default.getDiagnoses());
});
const newPatientParser = (req, _res, next) => {
    try {
        types_1.NewPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
app.post("/api/patients", newPatientParser, (req, res) => {
    const newPatient = patientService_1.default.addPatient(req.body);
    res.json(newPatient);
});
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
app.use(errorMiddleware);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
