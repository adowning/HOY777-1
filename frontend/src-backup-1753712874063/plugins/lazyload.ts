import Vue3Lazyload from 'vue3-lazyload';
import loadingIcon from "@/assets/loading.svg";

export const lazyloadOptions = {
  loading: loadingIcon,
  error: '',
  lifecycle: {
    loading: (el: any) => {
      // console.log('loading', el)
    },
    error: (el: any) => {
      // console.log('error', el)
    },
    loaded: (el: any) => {
      // console.log('loaded', el)
    }
  },
  delay: 500
};

export default Vue3Lazyload;