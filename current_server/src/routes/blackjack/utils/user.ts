import type { UserWithRelations } from '#/db/schema'

// // Define interfaces for data objects to ensure type safety
// interface GetUserInfoData {
//     userId: string;
// }

// interface GetUserBetsData {
//     page: number;
// }

// interface GetUserTransactionsData {
//     page: number;
// }

// interface SendUserAnonymousData {
//     anonymous: boolean;
// }

// interface SendUserDiscordData {
//     method: 'link' | 'unlink';
//     tokenDiscord?: string;
// }

// interface SendUserSeedData {
//     seedClient: string;
// }

// interface SendUserTipData {
//     receiverId: string;
//     amount: number;
// }

// export const generalCheckGetUserInfoData = (data: GetUserInfoData): void => {
//     if (!data || typeof data.userId !== 'string' || !validator.isMongoId(data.userId)) {
//         throw new Error('Your entered user id is invalid.');
//     }
// };

// export const generalCheckGetUserInfoUser = (userDatabase: User | null): void => {
//     if (!userDatabase) {
//         throw new Error('Your requested user was not found.');
//     }
// };

// export const generalCheckGetUserBetsData = (data: GetUserBetsData): void => {
//     if (!data || isNaN(data.page) || data.page <= 0) {
//         throw new Error('Your entered page is invalid.');
//     }
// };

// export const generalCheckGetUserTransactionsData = (data: GetUserTransactionsData): void => {
//     if (!data || isNaN(data.page) || data.page <= 0) {
//         throw new Error('Your entered page is invalid.');
//     }
// };

// export const generalCheckSendUserAnonymousData = (data: SendUserAnonymousData): void => {
//     if (!data || typeof data.anonymous !== 'boolean') {
//         throw new Error('Your entered anonymous value is invalid.');
//     }
// };

// export const generalCheckSendUserDiscordData = (data: SendUserDiscordData): void => {
//     if (!data || !['link', 'unlink'].includes(data.method)) {
//         throw new Error('Your entered method value is invalid.');
//     }
//     if (data.method === 'link' && typeof data.tokenDiscord !== 'string') {
//         throw new Error('Your entered discord token is invalid.');
//     }
// };

// export const generalCheckSendUserDiscordUser = (data: SendUserDiscordData, user: User): void => {
//     if (data.method === 'link' && user.discordId) {
//         throw new Error('You have already linked a discord account.');
//     }
//     if (data.method === 'unlink' && !user.discordId) {
//         throw new Error('You dont have a linked discord account at the moment.');
//     }
// };

// export const generalCheckSendUserSeedData = (data: SendUserSeedData): void => {
//     if (!data || typeof data.seedClient !== 'string' || data.seedClient.trim().length === 0 || data.seedClient.trim().length > 64) {
//         throw new Error('Your entered client seed is invalid.');
//     }
// };

// export const generalCheckSendUserSeedGames = (gamesDatabase: any[]): void => {
//     if (gamesDatabase.length >= 1) {
//         throw new Error('You’ve to complete all your open games first.');
//     }
// };

// export const generalCheckSendUserTipData = (data: SendUserTipData): void => {
//     if (!data || typeof data.receiverId !== 'string' || !validator.isMongoId(data.receiverId)) {
//         throw new Error('Your entered receiver id is invalid.');
//     }
//     if (isNaN(data.amount) || Math.floor(data.amount) < 10) {
//         throw new Error('Your entered tip amount is invalid.');
//     }
// };

// export const generalCheckSendUserTipUser = (data: SendUserTipData, user: User): void => {
//     if (user.balance < Math.floor(data.amount)) {
//         throw new Error('You do not have enough balance for this action.');
//     }
//     if (user.depositAmount < 50 * 1000) {
//         throw new Error('You need to have a total of 50 robux deposited.');
//     }
//     if (user.blockTip && user.limitTip === 0) {
//         throw new Error('You are not allowed to tip users.');
//     }
//     if (user.blockTip && user.limitTip < Math.floor(data.amount)) {
//         throw new Error(`You are not allowed to tip users more than R$${(Math.floor(user.limitTip) / 1000).toFixed(2)}.`);
//     }
// };

// export const generalCheckSendUserTipReceiver = (user: User, receiverDatabase: User | null): void => {
//     if (!receiverDatabase) {
//         throw new Error('Your entered receiver id is not available.');
//     }
//     if (user.id === receiverDatabase.id) {
//         throw new Error('You are not allowed to tip yourself.');
//     }
// };

// export const generalUserGetLevel = (user: User): number => {
//     const level = Math.floor(Math.pow(user.xp / 1000 / 100, 1 / 3));
//     return level >= 100 ? 100 : level;
// };

interface Rakeback {
    name: string | null;
    percentage: number;
}

export function generalUserGetRakeback(user: UserWithRelations): Rakeback {
    const xp = user.vipInfo[0].totalXp / 1000
    if (xp >= 1000 * 2000) return { name: 'titanium', percentage: 0.0025 }
    if (xp >= 1000 * 1000) return { name: 'platinum', percentage: 0.002 }
    if (xp >= 1000 * 500) return { name: 'gold', percentage: 0.0015 }
    if (xp >= 1000 * 250) return { name: 'silver', percentage: 0.001 }
    if (xp >= 1000 * 100) return { name: 'bronze', percentage: 0.0005 }
    return { name: null, percentage: 0 }
}

// export const userGetDiscordUserData = async (discordToken: string): Promise<any> => {
//     try {
//         const response = await fetch('https://discord.com/api/v9/users/@me', {
//             headers: { 'Authorization': `Bearer ${discordToken}` },
//         });
//         if (response.ok) {
//             return await response.json();
//         }
//         throw new Error('Could not fetch Discord user data.');
//     } catch (err) {
//         throw new Error('Something went wrong. Please try again in a few seconds.');
//     }
// };

// export const generalUserGetFormated = (user: User): any | null => {
//     if (user.anonymous) {
//         return null;
//     }

//     return {
//         id: user.id,
//         robloxId: user.robloxId,
//         username: user.username,
//         avatar: user.avatar,
//         rank: user.rank,
//         level: generalUserGetLevel(user),
//         stats: {
//             betAmount: user.betAmount,
//             wonAmount: user.wonAmount,
//             depositAmount: user.depositAmount,
//             withdrawAmount: user.withdrawAmount
//         },
//         rakeback: generalUserGetRakeback(user).name,
//         createdAt: user.createdAt,
//     };
// };

// export const generalSanitizeBets = (bets: any[]): any[] => {
//     return bets.map(bet => {
//         const sanitizedBet = { ...bet };

//         if (['mines', 'towers', 'unbox'].includes(sanitizedBet.method)) {
//             sanitizedBet.fair.seed = {
//                 seedClient: sanitizedBet.fair.seed.seedClient,
//                 hash: sanitizedBet.fair.seed.hash,
//                 ...(sanitizedBet.fair.seed.state === 'completed' ? { seedServer: sanitizedBet.fair.seed.seedServer } : {}),
//             };
//         } else if (['crash', 'roll'].includes(sanitizedBet.method) && sanitizedBet.game) {
//             sanitizedBet.game.seedServer = sanitizedBet.game.state === 'completed' ? sanitizedBet.game.seedServer : undefined;
//         }

//         return sanitizedBet;
//     });
// };

// export const generalSanitizeUserSeed = (seedDatabase: any): any => {
//     let sanitized = JSON.parse(JSON.stringify(seedDatabase));

//     if (sanitized.state !== 'completed') {
//         delete sanitized._id;
//         delete sanitized.seedServer;
//         delete sanitized.user;
//         delete sanitized.state;
//     }

//     return sanitized;
// }
