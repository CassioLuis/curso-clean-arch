"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("../../src/domain/entity/Coupon"));
test("Deve criar um cupom de desconto valido", function () {
    const coupon = new Coupon_1.default("VALE20", 20, new Date("2023-02-23"));
    const today = new Date("2023-02-22");
    const isValid = coupon.isValid(today);
    expect(isValid).toBeTruthy();
});
test("Deve criar um cupom de desconto expirado", function () {
    const coupon = new Coupon_1.default("VALE20", 20, new Date("2023-02-21"));
    const today = new Date("2023-02-22");
    const isExpired = coupon.isExpired(today);
    expect(isExpired).toBeTruthy();
});
test("Deve criar um cupom de desconto valido e calcular o desconto", function () {
    const coupon = new Coupon_1.default("VALE20", 20);
    const discount = coupon.calculateDiscount(1000);
    expect(discount).toBe(200);
});
