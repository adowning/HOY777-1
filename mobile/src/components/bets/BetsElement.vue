<template>
    <div class="bets-element">
        <div class="element-game">
            <IconCrash v-if="bet.method === 'crash'" />
            <IconRoll v-else-if="bet.method === 'roll'" />
            <IconBlackjack v-else-if="bet.method === 'blackjack'" />
            <IconDuels v-else-if="bet.method === 'duels'" />
            <IconMines v-else-if="bet.method === 'mines'" />
            <IconTowers v-else-if="bet.method === 'towers'" />
            <IconUnbox v-else-if="bet.method === 'unbox'" />
            <IconBattles v-else-if="bet.method === 'battles'" />
            <span v-bind:class="{
                'gradient-yellow': bet.method === 'crash',
                'gradient-green': bet.method === 'roll',
                'gradient-blue-dark': bet.method === 'blackjack',
                'gradient-red': bet.method === 'duels',
                'gradient-purple': bet.method === 'mines',
                'gradient-blue': bet.method === 'towers',
                'gradient-pink': bet.method === 'unbox',
                'gradient-orange': bet.method === 'battles'
            }">{{ betsGetMethod }}</span>
        </div>
        <div class="element-user" v-bind:class="[
            bet.user === null ?
                'user-hidden' :
                ['user-' + betsGetRank(bet.user), 'user-' + betsGetLevelColor(bet.user)]
        ]">
            <div class="user-avatar">
                <AvatarImage v-bind:image="bet.user === null ? null : bet.user.avatar" />
            </div>
            <div v-if="bet.user !== null" v-html="bet.user.username" class="user-username"></div>
            <div v-else>Anonymous</div>
        </div>
        <div class="element-time">
            <span>{{ betsGetDate[0] }},</span>{{ betsGetDate[1] }}
        </div>
        <div class="element-wager">
            <img src="@/assets/img/icons/coin.svg" alt="icon" />
            <div class="wager-value">
                <span>{{ betsFormatValue(betsGetAmount).split('.')[0] }}</span>.{{ betsFormatValue(betsGetAmount).split('.')[1] }}
            </div>
        </div>
        <div class="element-multiplier">
            <span
                v-bind:class="{ 'gradient-green': betsGetMultiplier > 0 }">{{ parseFloat(betsGetMultiplier).toFixed(2) }}x</span>
        </div>
        <div class="element-payout" v-bind:class="{ 'payout-positive': (bet.payout / betsGetAmount) > 0 }">
            <img src="@/assets/img/icons/coin.svg" alt="icon" />
            <div class="payout-value">
                <span>{{ betsFormatValue(bet.payout).split('.')[0] }}</span>.{{ betsFormatValue(bet.payout).split('.')[1] }}
            </div>
        </div>
    </div>
</template>
<style scoped>
.bets-element {
    width: 100%;
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 35px;
    background-color: #031b2e;
}

.bets-element:nth-child(even) {
    background-color: #051e33;
}

.bets-element .element-game {
    width: 20%;
    display: flex;
    align-items: center;
}

.bets-element .element-game svg {
    margin-right: 10px;
    fill: #bbbfd0;
}

.bets-element .element-game span {
    font-size: 14px;
    font-weight: 700;
}

.bets-element .element-user {
    width: 20%;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #bbbfd0;
}

.bets-element .element-user.user-hidden {
    font-style: italic;
}

.bets-element .user-avatar {
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid #9e9e9e;
    overflow: hidden;
}

.bets-element .element-user.user-blue .user-avatar {
    border: 1px solid #559ee4;
}

.bets-element .element-user.user-green .user-avatar {
    border: 1px solid #b8e92d;
}

.bets-element .element-user.user-orange .user-avatar {
    border: 1px solid #fca311;
}

.bets-element .element-user.user-red .user-avatar {
    border: 1px solid #ff4e4e;
}

.bets-element .element-user.user-purple .user-avatar {
    border: 1px solid #6953f1;
}

.bets-element .element-user.user-partner .user-avatar {
    border: 1px solid #eca822;
}

.bets-element .element-user.user-mod .user-avatar {
    border: 1px solid #ffb703;
}

.bets-element .element-user.user-admin .user-avatar {
    border: 1px solid #00ffc2;
}

.bets-element .user-avatar .avatar-image {
    width: 100%;
    height: 100%;
}

.bets-element .user-hidden .user-avatar .avatar-image {
    width: 100%;
    height: 100%;
}

.bets-element .user-username {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.bets-element .element-time {
    width: 20%;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #bbbfd0;
}

.bets-element .element-time span {
    margin-right: 4px;
}

.bets-element .element-wager,
.bets-element .element-payout {
    width: 15%;
    display: flex;
    align-items: center;
}

.bets-element .element-payout {
    justify-content: flex-end;
}

.bets-element .element-wager img,
.bets-element .element-payout img {
    width: 18px;
    height: 18px;
    margin-right: 10px;
}

.bets-element .wager-value,
.bets-element .payout-value {
    font-size: 10px;
    font-weight: 600;
    color: #bbbfd0;
}

.bets-element .wager-value span,
.bets-element .payout-value span {
    font-size: 14px;
    font-weight: 800;
}

.bets-element .wager-value span,
.bets-element .payout-positive .payout-value span {
    color: #ffffff;
}

.bets-element .element-multiplier {
    width: 10%;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #bbbfd0;
}

.bets-element .element-multiplier.multiplier-positive {}

@media only screen and (max-width: 950px) {

    .bets-element {
        height: auto;
        position: relative;
        display: grid;
        grid-template-rows: 42px 54px;
        grid-template-columns: 33.33% 33.33% 33.33%;
        padding: 0;
        background: none;
        border-top: 1px solid #0f324e;
    }

    .bets-element:nth-child(even) {
        background: none;
    }

    .bets-element .element-game,
    .bets-element .element-user,
    .bets-element .element-time {
        width: 100%;
        height: 100%;
        justify-content: center;
        background-color: rgba(15, 50, 78, 0.35);
    }

    .bets-element .element-game {
        grid-row: 1;
    }

    .bets-element .element-user {
        grid-column: 1;
        grid-row: 1;
    }

    .bets-element .user-username {
        max-width: 90px;
    }

    .bets-element .element-time {
        grid-column: 2;
        grid-row: 1;
    }

    .bets-element .element-wager,
    .bets-element .element-multiplier,
    .bets-element .element-payout {
        width: 100%;
        height: 100%;
        justify-content: center;
        background-color: rgba(4, 26, 45, 0.5);
    }

    .bets-element .element-wager {
        grid-column: 1;
        grid-row: 2;
    }

    .bets-element .element-multiplier {
        position: relative;
        grid-column: 2;
        grid-row: 2;
    }

    .bets-element .element-multiplier::before {
        content: '';
        width: 1px;
        height: 18px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        background-color: #0c324e;
    }

    .bets-element .element-multiplier::after {
        content: '';
        width: 1px;
        height: 18px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        background-color: #0c324e;
    }

    .bets-element .element-payout {
        grid-column: 3;
        grid-row: 2;
    }

}

@media only screen and (max-width: 475px) {
    .bets-element .user-username {
        max-width: 85px;
    }

    .bets-element .element-time span {
        display: none;
    }
}
</style>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import type { PropType, } from 'vue';
import type { Bet, } from '@/interfaces/bets';
import AvatarImage from '@/components/AvatarImage.vue';
import type { User } from '@/plugins/api/gen';

// --- Props ---
const props = defineProps({
    bet: {
        type: Object as PropType<Bet>,
        required: true
    }
});

// --- Dynamic Imports for Icons ---
const gameIcon = computed(() => {
    const method = props.bet.method.charAt(0).toUpperCase() + props.bet.method.slice(1);
    return defineAsyncComponent(() => import(`@/components/icons/Icon${method}.vue`));
});

// --- Helper Functions ---
const betsFormatValue = (value: number): string[] => {
    const formatted = parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formatted.split('.');
};
const betsGetRank = (user: User): string => user.role !== 'USER' ? user.role : user.role;

// --- Computed Properties for Styling and Data ---
const formattedWager = computed(() => betsFormatValue(betsGetAmount.value));
const formattedPayout = computed(() => betsFormatValue(props.bet.payout));

const userBorderStyle = computed(() => {
    if (!props.bet.user) return 'border-[#9e9e9e]'; // Default border

    const rank = betsGetRank(props.bet.user);
    const level = props.bet.user.vipInfo.level;

    if (rank === 'partner') return 'border-[#eca822]';
    if (rank === 'mod') return 'border-[#ffb703]';
    if (rank === 'admin') return 'border-[#00ffc2]';

    if (level >= 100) return 'border-[#6953f1]'; // Purple
    if (level >= 76) return 'border-[#ff4e4e]'; // Red
    if (level >= 51) return 'border-[#fca311]'; // Orange
    if (level >= 26) return 'border-[#b8e92d]'; // Green
    if (level >= 2) return 'border-[#559ee4]'; // Blue

    return 'border-[#9e9e9e]'; // Default border
});

const gameColorClass = computed(() => ({
    'text-[#fca311]': props.bet.method === 'crash', // gradient-yellow
    'text-[#b8e92d]': props.bet.method === 'roll',  // gradient-green
    // ... add other colors as needed from your design system
    'text-red-500': props.bet.method === 'duels'
}));

const betsGetMethod = computed(() => {
    if (props.bet.method === 'duels') return 'Dice Duels';
    return props.bet.method.charAt(0).toUpperCase() + props.bet.method.slice(1);
});

const betsGetDate = computed(() => {
    const date = new Date(props.bet.updatedAt).toLocaleString('en-US', { hour12: true, year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    return date.split(',');
});

const betsGetAmount = computed(() => {
    if (props.bet.method === 'blackjack' && typeof props.bet.amount === 'object') {
        let amount = props.bet.amount.main + props.bet.amount.sideLeft + props.bet.amount.sideRight;
        if (props.bet.actions?.includes('split')) amount += props.bet.amount.main;
        return Math.floor(amount);
    }
    return props.bet.amount as number;
});

const betsGetMultiplier = computed(() => {
    if (['crash', 'roll'].includes(props.bet.method)) {
        return betsGetAmount.value > 0 ? props.bet.payout / betsGetAmount.value : 0;
    }
    return props.bet.multiplier / 100;
});
</script>