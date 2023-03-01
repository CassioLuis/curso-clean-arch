import Cpf from "../../src/domain/entity/Cpf";

test("Deve validar um CPF", function () {
  const cpf = new Cpf("935.411.347-80");
  expect(cpf).toBeTruthy();
});

test("Deve tentar validar um cpf invalido", function () {
  expect(() => new Cpf("123.456.789-99")).toThrow(new Error("CPF Invalido"));
});

test("Deve tentar validar um cpf com todos os digitos iguais", function () {
  expect(() => new Cpf("111.111.111-11")).toThrow(new Error("CPF Invalido"));
});

test("Deve tentar validar um cpf invalido muito grande", function () {
  expect(() => new Cpf("123.456.798-1000")).toThrow(new Error("CPF Invalido"));
});

test("Deve tentar validar um cpf invalido muito pequeno", function () {
  expect(() => new Cpf("123.456")).toThrow(new Error("CPF Invalido"));
});
