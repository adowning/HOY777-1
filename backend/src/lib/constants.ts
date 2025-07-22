import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'

export const ZOD_ERROR_MESSAGES = {
  REQUIRED: 'Required',
  EXPECTED_NUMBER: 'Expected number, received nan',
  NO_UPDATES: 'No updates provided',
}

export const ZOD_ERROR_CODES = {
  INVALID_UPDATES: 'invalid_updates',
}

export const notFoundSchema = createMessageObjectSchema(
  HttpStatusPhrases.NOT_FOUND
)

export enum JackpotType {
    MINOR = 'MINOR',
    MAJOR = 'MAJOR',
    GRAND = 'GRAND',
}

export const JACKPOT_CONFIG = {
    [JackpotType.MINOR]: {
        type: JackpotType.MINOR,
        seedAmountCoins: 1000,
        minimumBetCoins: 1,
        contributionRateBasisPoints: 100, // 1%
        probabilityPerMillion: 1000, // 0.1%
        minimumTimeBetweenWinsMinutes: 1,
    },
    [JackpotType.MAJOR]: {
        type: JackpotType.MAJOR,
        seedAmountCoins: 10000,
        minimumBetCoins: 10,
        contributionRateBasisPoints: 150, // 1.5%
        probabilityPerMillion: 100, // 0.01%
        minimumTimeBetweenWinsMinutes: 60,
    },
    [JackpotType.GRAND]: {
        type: JackpotType.GRAND,
        seedAmountCoins: 100000,
        minimumBetCoins: 20,
        contributionRateBasisPoints: 200, // 2%
        probabilityPerMillion: 10, // 0.001%
        minimumTimeBetweenWinsMinutes: 1440, // 24 hours
    },
};
