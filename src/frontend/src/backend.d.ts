import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type CurrencySymbol = string;
export type TransactionId = bigint;
export type Time = bigint;
export interface Portfolio {
    ada: number;
    bnb: number;
    btc: number;
    eth: number;
    sol: number;
}
export interface UserProfile {
    name: string;
}
export interface Transaction {
    id: TransactionId;
    transactionType: Variant_receive_send;
    coin: CurrencySymbol;
    usdValue: number;
    timestamp: Time;
    amount: number;
    counterpartyAddress: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_receive_send {
    receive = "receive",
    send = "send"
}
export interface backendInterface {
    addTransaction(coin: CurrencySymbol, transactionType: Variant_receive_send, amount: number, usdValue: number, counterpartyAddress: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPortfolio(): Promise<Portfolio>;
    getTransactionHistory(): Promise<Array<Transaction>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBalance(currencySymbol: CurrencySymbol, amount: number): Promise<void>;
}
