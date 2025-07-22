import { JACKPOT_CONFIG, JackpotType } from "#/lib/constants";


export const coinsToDollars = (coins: number): number => coins / 100;

export const dollarsToCoins = (dollars: number): number => Math.round(dollars * 100);

export const calculateContribution = (wagerCoins: number, contributionRateBasisPoints: number): number => {
    return Math.floor((wagerCoins * contributionRateBasisPoints) / 10000);
};

export const getEligibleJackpots = (wagerCoins: number): JackpotType[] => {
    const eligible: JackpotType[] = [];
    if (wagerCoins >= JACKPOT_CONFIG.MINOR.minimumBetCoins) eligible.push(JackpotType.MINOR);
    if (wagerCoins >= JACKPOT_CONFIG.MAJOR.minimumBetCoins) eligible.push(JackpotType.MAJOR);
    if (wagerCoins >= JACKPOT_CONFIG.GRAND.minimumBetCoins) eligible.push(JackpotType.GRAND);
    return eligible;
};

export const generateRandomSeedAmount = (baseSeedCoins: number): number => {
    const variation = Math.floor(baseSeedCoins * 0.1);
    const randomOffset = Math.floor(Math.random() * (variation * 2 + 1)) - variation;
    return baseSeedCoins + randomOffset;
};

export const canWinJackpot = (lastWonAt: Date | null, minimumTimeBetweenWinsMinutes: number): boolean => {
    if (!lastWonAt) return true;
    const now = new Date();
    const timeDiffMinutes = (now.getTime() - lastWonAt.getTime()) / (1000 * 60);
    return timeDiffMinutes >= minimumTimeBetweenWinsMinutes;
};

export const checkJackpotWin = (probabilityPerMillion: number): boolean => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber < probabilityPerMillion;
};

export { JACKPOT_CONFIG };
