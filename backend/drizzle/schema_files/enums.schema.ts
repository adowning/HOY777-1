import { pgEnum } from "drizzle-orm/pg-core"

export const jackpotTypeEnum = pgEnum("jackpot_type_enum", ['GRAND', 'MAJOR', 'MINOR', 'MINI'])
export const paymentMethod = pgEnum("payment_method", ['INSTORE_CASH', 'CREDIT_CARD', 'BANK_TRANSFER', 'CRYPTO'])
export const role = pgEnum("role", ['admin', 'user'])
export const sessionStatus = pgEnum("session_status", ['ACTIVE', 'COMPLETED', 'EXPIRED'])