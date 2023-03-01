"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("../../src/domain/entity/Cpf"));
test("Deve validar um CPF", function () {
    const cpf = new Cpf_1.default("935.411.347-80");
    expect(cpf).toBeTruthy();
});
test("Deve tentar validar um cpf invalido", function () {
    expect(() => new Cpf_1.default("123.456.789-99")).toThrow(new Error("CPF Invalido"));
});
test("Deve tentar validar um cpf com todos os digitos iguais", function () {
    expect(() => new Cpf_1.default("111.111.111-11")).toThrow(new Error("CPF Invalido"));
});
test("Deve tentar validar um cpf invalido muito grande", function () {
    expect(() => new Cpf_1.default("123.456.798-1000")).toThrow(new Error("CPF Invalido"));
});
test("Deve tentar validar um cpf invalido muito pequeno", function () {
    expect(() => new Cpf_1.default("123.456")).toThrow(new Error("CPF Invalido"));
});
