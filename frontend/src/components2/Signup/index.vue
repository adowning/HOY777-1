<script lang="ts" setup>
import ValidationBox from "@/components/Signup/ValidationBox.vue";
import SignupHeader from "@/components/Signup/Header.vue";
</script>

<template>
  <div class="signup-container">
    <SignupHeader />
    <div class="signup-body pt-6">
      <!-- SIGN UP FORM  -->
      <form class="full-width">
        <div class="relative mt-0">
          <input
            label="Email Address"
            class="form-textfield dark-textfield"
            variant="solo"
            density="comfortable"
          />
          <ValidationBox
            title="Please enter a valid email address."
            :withCautionIcon="true"
          />
        </div>
        <div class="register-mail-card">
          <ul class="dark-list">
            <li
              class="text-500-16 white"
              >email@gmail.com</li>
            <li
              class="text-500-16 white"
              >email@hotmail.com</li>
            <li
              class="text-500-16 white"
              >email@yahoo.com</li>
            <li
              class="text-500-16 white"
              >email@icloud.com</li>
            <li
              class="text-500-16 white"
              >email@outlook.com</li>
          </ul>
        </div>
        <div class="mt-2 relative">
          <input
            label="Password"
            class="form-textfield dark-textfield"
            variant="solo"
            density="comfortable"
            type="password"
          />
          <img
            src="@/assets/public/svg/icon_public_07.svg"
            class="disable-password"
          />
          <img
            src="@/assets/public/svg/icon_public_06.svg"
            class="disable-password"
          />
          <ValidationBox
          />
        </div>
        <div class="mt-4">
          <input
            label="Promo Code"
            class="form-textfield normal-textfield"
            variant="solo"
            density="comfortable"
          />
        </div>
        <div class="mt-2">
          <div class="pl-1">
            <input
              type="checkbox"
              hide-details
              class="agreement-checkbox"
            />
          </div>
          <div>
            <p
              class="agreement-text"
            >
              I am 18 years of age or older and I have read, accept and agree to the
              <span class="white pointer">
                Terms and Conditions.
              </span>
            </p>
          </div>
        </div>
        <div>
          <button
            class="ma-3 signup-btn w-full h-15"
          >
            Sign Up
          </button>
        </div>
        <div class="flex justify-center mb-6 mt-10">
          <p class="signin-text mr-4">Already have an account?</p>
          <p class="signin-text2">
            Sign In
          </p>
        </div>
        <div class="mt-2">
          <p class="divide-text">
            or
          </p>
          <hr class="white" />
        </div>
        <div class="mt-10">
          <div class="w-8/12 offset-2">
            <div
              class="flex justify-around bg-surface-variant social-icon-wrapper"
            >
              <div
                class="rounded"
              >
                <button class="social-icon-button">
                  <img src="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <!-- Confirm cancel. -->
      <div class="full-width">
        <div class="mt-8">
          <p class="label-text-xl white center full-width">
            Are you sure you want to cancel?
          </p>
        </div>
        <div class="mt-10">
          <p class="label-text-md slate-gray center full-width">
            If you cancel, your information will not be saved.
          </p>
        </div>
        <div class="mt-8">
          <button
            class="ma-3 button-bright text-none w-full h-15"
          >
            Continue
          </button>
        </div>
        <div class="mt-4">
          <button
            class="ma-3 button-dark text-none w-full h-15"
          >
            Cancel
          </button>
        </div>
      </div>
      <!-- Already registered notification -->
      <div class="full-width">
        <div class="mt-8">
          <p class="label-text-md slate-gray center full-width pl-12 pr-12">
            This email address is already registered. Please go to the login page.
          </p>
        </div>
        <div class="mt-12">
          <button
            class="ma-3 button-bright text-none w-full h-15"
          >
            Confirm
          </button>
        </div>
        <div class="mt-4">
          <button
            class="ma-3 button-dark text-none w-full h-15"
          >
            Cancel
          </button>
        </div>
      </div>
      <!-- Enter avatar and display name -->
      <div class="full-width">
        <div class="carousel-container ml-0">
          <div class="carousel">
            <div>
              <button
                class="button-carousel ma-2 text-none"
              ></button>
            </div>
            <div>
              <button
                class="button-carousel ma-2 text-none"
              ></button>
            </div>
            <div>
              <img src="@/assets/public/image/ua_public_01.png" />
            </div>
          </div>
        </div>
        <div class="mt-4 mb-2">
          <p class="label-text-lg white full-width center">
            Choose your avatar and display name
          </p>
        </div>
        <div class="mt-4 relative display-name-input">
          <input
            label="Username"
            class="form-textfield dark-textfield"
            variant="solo"
            density="comfortable"
          />
          <ValidationBox
          />
        </div>
        <div>
          <button
            class="ma-3 mt-8 button-bright text-none w-full h-15"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    <button class="close-button">
      <div class="text-white">
        mdi-close
      </div>
    </button>
  </div>
  <!-- <Notification
    :notificationShow="notificationShow"
    :notificationText="notificationText"
    :checkIcon="checkIcon"
  /> -->
</template>

<style lang="scss">
.register-mail-card {
  position: absolute;
  top: 274px;
  left: 50%;
  transform: translateX(-50%);
  background: #1d2027;
  width: 375px;
  border-radius: 16px;
  z-index: 200;
  overflow: hidden;
  transition: height 0.3s ease-out;
}

.signup-btn:disabled {
  background: #23262f;
  cursor: default;
}

.signup-btn {
  background: #009b3a;
}

.signup-btn:hover:enabled {
  background: #0cb6fa;
}

// button:active:enabled {
//     transform: scale(0.95);
//     filter: brightness(80%);
// }

.disable-password {
  position: absolute;
  top: 31px;
  right: 27px;
  cursor: pointer;
}

// pc dialog container
.signup-container {
  background-color: #2e274c;
  border-radius: 16px !important;
}

// wrapper
.signup-body {
  margin: 0px !important;
  padding: 48px;

  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
  }
}

.display-name-input {
  .form-textfield div.v-field__field {
    box-shadow: 2px 0px 4px 1px rgba(0, 0, 0, 0.12) inset !important;
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

// divider
.divide-text {
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #23262f;
  position: relative;
  top: 12px;
  text-align: center;
  width: 120px;
  background-color: #2e274c;
  margin: auto;
  z-index: 1;
}

// social icon list component
.social-icon-wrapper {
  background-color: #2e274c !important;

  .v-sheet {
    border-radius: 50px !important;
  }
}

.social-icon-button {
  background-color: #131828 !important;
}

// ask signin text
.signin-text {
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  text-align: right;
}

.signin-text2 {
  cursor: pointer;
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: #009b3a;
}

// agreement
.agreement-text {
  font-family: Inter,-apple-system,Framedcn,Helvetica Neue,Condensed,DisplayRegular,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin-top: 13px;
  color: #7782aa;
}

.agreement-checkbox {
  i.v-icon {
    color: #1d2027;
    background-color: #01983a;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    margin-top: 4px;
  }

  i.mdi-checkbox-blank-outline {
    background-color: #1d2027;
    box-shadow: inset 1px 0px 2px 1px rgba(0, 0, 0, 0.11);
    border-radius: 4px;
  }
}

// carousel
.carousel-container {
  width: 100%;
}
</style>
