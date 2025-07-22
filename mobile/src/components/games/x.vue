<template>
    <div class="game-wrapper  mobile-view" style="--max-height: 695.265625px; --fullscreen-z: 9999;">
        <div id="softswiss_game_container" class="game-content  mobile-view"><!---->
            <div class="absolute h-full w-full flex items-center">
                <div class="content ">
                    <div class="flex justify-center items-center false  centered">
                        <div class="loader">
                            <div class="loader-animation "></div>
                        </div>
                    </div>
                </div><!---->
            </div> <iframe id="game" title="game launcher" frameborder="0"
                src="https://static-live.hacksawgaming.com/launcher/static-launcher.html?&amp;gameid=1620&amp;channel=mobile&amp;mode=live&amp;currency=XGLD&amp;language=en&amp;lobbyurl=https%3a%2f%2fstake.us&amp;token=17dce19f-fb40-4036-81d9-da1d58753273&amp;partner=stake_sweeps&amp;branding=social&amp;rcenable=false&amp;rcelapsed=0&amp;rcinterval=0&amp;jurisdiction=sw-sw"
                allow=""></iframe><!----><!----> <!----><!----><!---->
        </div><!---->
    </div>

</template>
<style scoped>
.overlay {
    position: absolute;
    display: grid;
    padding: var(--space-4);
    grid-gap: var(--space-2);
    grid-auto-rows: max-content;
    align-content: center;
    justify-items: center;
    color: var(--grey-200);
    background: #0e1224e6;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0
}

.game-wrapper {
    --header-height: 60px;
    --max-height: 675px;
    overflow: hidden;
    background: var(--grey-700)
}

.game-wrapper.theater-mode-enabled {
    height: calc(100vh - var(--header-height))
}

.game-wrapper:not(.theater-mode-enabled) {
    border-radius: var(--border-radius-md)
}

.game-wrapper.mobile-view {
    height: calc(100dvh - var(--header-height) - var(--mobile-footer-height) - 6vw)
}

.game-wrapper.mobile-view.mobile-fullscreen {
    z-index: var(--fullscreen-z);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: unset
}

.game-wrapper.landscape-view {
    height: calc(100dvh - 6vw)
}

.game-wrapper.landscape-view.mobile-fullscreen {
    z-index: var(--fullscreen-z);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: unset
}

.game-content {
    height: 100%;
    position: relative
}

.game-content:before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 56.25%
}

.game-content.theater-mode-enabled {
    background: var(--grey-900);
    max-height: var(--max-height, 675px)
}

.game-content.theater-mode-enabled.mobile-view,
.game-content.theater-mode-enabled.landscape-view {
    max-height: unset
}

.game-content:not(.theater-mode-enabled) {
    max-height: unset
}

.game-content.mobile-view {
    position: relative
}

.game-content.mobile-view:before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 177.7777777778%
}

.game-content.landscape-view {
    position: relative
}

.game-content.landscape-view:before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 56.25%
}

.game-content>* {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%
}

iframe {
    border: 0
}

#game_wrapper>iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0
}
</style>