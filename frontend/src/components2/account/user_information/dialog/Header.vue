<script lang="ts" setup>
import { toRefs } from 'vue';

const props = defineProps<{title: string}>();
const {title} = toRefs(props);
const emit = defineEmits<{ (): void }>()

const userDialogHide = () => {
    emit('userDialogHide');
}
</script>
  
<template>
    <div class="account-header">
        <div class="header flex items-center justify-center relative">
            <div class="text-700-18 white">{{ title }}</div>
            <button class="close-button" @click="userDialogHide">
                <div class="text-gray-400">
                    mdi-close
                </div>
            </button>
        </div>
    </div>
</template>

<style lang="scss">
// header container
.account-header {
    background-color: #1D2027;
    border-radius: 16px !important;

    .header {
        text-align: center;
        background: #1D2027;
        border-radius: 16px 16px 0px 0px;
        height: 72px;
    }

    @media (max-width: 600px) {
        .header {
            height: 60px;
        }
    }

    // close modal button
    .close-button {
        box-shadow: none !important;
        background-color: transparent !important;
        position: absolute !important;
        top: 5px;
        right: 5px;
    }
}
</style>