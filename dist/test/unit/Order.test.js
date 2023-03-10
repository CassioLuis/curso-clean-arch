"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("../../src/domain/entity/Coupon"));
const DefaultFreightCalculator_1 = __importDefault(require("../../src/domain/entity/DefaultFreightCalculator"));
const FixedFreightCalculator_1 = __importDefault(require("../../src/domain/entity/FixedFreightCalculator"));
const Item_1 = __importDefault(require("../../src/domain/entity/Item"));
const Order_1 = __importDefault(require("../../src/domain/entity/Order"));
test("Deve criar um pedido vazio com CPF valido", function () {
    const cpf = "839.435.452-10";
    const order = new Order_1.default(cpf);
    const total = order.getTotal();
    expect(total).toBe(0);
});
test("Deve tentar criar um pedido vazio com CPF invalido", function () {
    const cpf = "111.111.111-11";
    expect(() => new Order_1.default(cpf)).toThrow(new Error("CPF Invalido"));
});
test("Deve criar um pedido com 3 itens", function () {
    const cpf = "839.435.452-10";
    const order = new Order_1.default(cpf);
    order.addItem(new Item_1.default(1, "Música", "CD", 30), 3);
    order.addItem(new Item_1.default(2, "Vídeo", "DVD", 50), 1);
    order.addItem(new Item_1.default(3, "Vídeo", "VHS", 10), 2);
    const total = order.getTotal();
    expect(total).toBe(160);
});
test("Deve criar um pedido com 3 itens com um cupom de desconto", function () {
    const cpf = "839.435.452-10";
    const order = new Order_1.default(cpf);
    order.addItem(new Item_1.default(1, "Música", "CD", 30), 3);
    order.addItem(new Item_1.default(2, "Vídeo", "DVD", 50), 1);
    order.addItem(new Item_1.default(3, "Vídeo", "VHS", 10), 2);
    order.addCoupon(new Coupon_1.default("VALE20", 20));
    const total = order.getTotal();
    expect(total).toBe(128);
});
test("Deve criar um pedido com 3 itens com um cupom de desconto expirado", function () {
    const cpf = "839.435.452-10";
    const order = new Order_1.default(cpf, new Date("2022-02-22"));
    order.addItem(new Item_1.default(1, "Música", "CD", 30), 3);
    order.addItem(new Item_1.default(2, "Vídeo", "DVD", 50), 1);
    order.addItem(new Item_1.default(3, "Vídeo", "VHS", 10), 2);
    order.addCoupon(new Coupon_1.default("VALE20", 20, new Date("2022-02-01")));
    const total = order.getTotal();
    expect(total).toBe(160);
});
test("Deve criar um pedido com 3 itens com calculo do frete com a estrategia default", function () {
    const cpf = "839.435.452-10";
    const order = new Order_1.default(cpf, new Date("2022-02-22"), new DefaultFreightCalculator_1.default());
    order.addItem(new Item_1.default(4, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Item_1.default(5, "Instrumentos Musicais", "Amplificado", 5000, 100, 50, 50, 20), 1);
    order.addItem(new Item_1.default(6, "Acessorios", "Cabo", 30, 10, 10, 10, 0.9), 3);
    const freight = order.getFreight();
    expect(freight).toBe(260);
});
test("Deve criar um pedido com 3 itens com calculo do frete com a estrategia fixo", function () {
    const cpf = "839.435.452-10";
    const order = new Order_1.default(cpf, new Date("2022-02-22"), new FixedFreightCalculator_1.default());
    order.addItem(new Item_1.default(4, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Item_1.default(5, "Instrumentos Musicais", "Amplificado", 5000, 100, 50, 50, 20), 1);
    order.addItem(new Item_1.default(6, "Acessorios", "Cabo", 30, 10, 10, 10, 0.9), 3);
    const freight = order.getFreight();
    expect(freight).toBe(50);
});
