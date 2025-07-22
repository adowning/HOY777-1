<template>
  <!-- <div class="mobile-preview"> -->
    <div class="phone-frame">
      <div class="phone-screen">
         <!-- <TopBarMobile /> -->
         <!-- <BackGround /> -->
  <slot class="mobile-section"></slot>
    <!-- <FooterBarMobile /> -->

      </div>

    </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
</script>

<style scoped>
.mobile-section {
  min-height: 900px;
  position: absolute;
  width: 100%;
}
.mobile-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  /* Cover the entire viewport */
  flex-direction: column;
  padding: 0;
  background-position: center;
  width: 100%;
   border: 16px solid black;
  border-radius: 36px;
  
}

.phone-frame {
  width: 390px; /* Pixel 7 width */
  height: 844px; /* Pixel 7 height */
  border: 16px solid black;
  border-radius: 36px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
  background: #111;
  
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
      background-image: url('/images/starsbg.png');
  background-size: cover;
}
.mobile-section {
  /* Background image from URL provided by user */
  background-image: url('/images/starsbg.png');
  background-size: cover;
  /* Cover the entire viewport */
  background-position: center;
  /* Center the background image */
  /* background-repeat: no-repeat;  */
  min-height: 100vh;
  /* Make sure the body takes at least the full viewport height */
  font-family: 'Roboto', sans-serif;
  /* Apply a default sans-serif font */
  /* Flexbox utilities to center the game area on the page */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 0;
  /* Reduced padding slightly for larger game area */
}
</style>