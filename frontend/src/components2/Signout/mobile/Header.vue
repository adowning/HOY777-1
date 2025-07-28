<script lang="ts" setup>
</script>

<template>
  <div class="mobile-dialog-container">
    <div class="mobile-dialog-width mb-2">
      <div class="mobile-dialog-toggle">
        <input
          type="checkbox"
          id="mobile-dialog-toggle"
        />
        <label for="mobile-dialog-toggle">
          <div class="login">
            <P>Login</P>
          </div>
          <div class="register">
            <P>Sign Up</P>
          </div>
        </label>
      </div>
    </div>
    <button
      class="m-close-button"
    >
      <img src="@/assets/public/svg/icon_public_10.svg" />
    </button>
  </div>
</template>
<style lang="scss">
.mobile-dialog-container {
  position: sticky !important;
  top: 0px;
  height: 56px;
  width: 100%;
  background: $color_1;
}

.mobile-dialog-width {
  width: 280px;
  background: #1d2027;
  margin: auto;
  height: 48px;
  border-radius: 0px 0px 24px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px 1px #0000004d;
}

.mobile-dialog-toggle {
  margin-top: 4px;
  margin-bottom: 4px;

  label {
    width: 200px;
    height: 40px;
    position: relative;
    display: block;
    background: #15161c;
    border-radius: 20px !important;
    cursor: pointer;
    transition: 0.1s;
    box-shadow: 0px 0px 6px 1px #00000059 inset;

    div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 12px;
    }

    .login {
      left: 36px;
      transition: 0.3s;
      color: white;

      img {
        width: 20px;
        height: 24px;
        margin-right: 4px;
      }
    }

    .register {
      left: 125px;
      transition: 0.3s;
      color: white;

      img {
        width: 20px;
        margin-right: 4px;
      }
    }
  }

  label:after {
    content: "";
    width: 98px;
    height: 36px;
    position: absolute;
    top: 2px;
    left: 2px;
    background: #009b3a;
    border-radius: 18px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  input {
    width: 0;
    height: 0;
    visibility: hidden;
    position: absolute;
  }

  input:checked + label:after {
    left: 100px;
  }

  label:active:after {
    width: 74px;
  }

  input:checked + label .login {
    color: #7782aa;
  }

  input:checked + label .register {
    color: white;
  }
}
</style>
