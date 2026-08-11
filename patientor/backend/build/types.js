"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPatientSchema = exports.GenderValues = void 0;
const zod_1 = require("zod");
exports.GenderValues = {
    Male: "male",
    Female: "female",
    Other: "other",
};
exports.NewPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    occupation: zod_1.z.string(),
    gender: zod_1.z.enum(exports.GenderValues),
    ssn: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional(),
});
