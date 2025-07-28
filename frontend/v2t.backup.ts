
export const mapper = {
  /**
   * ====================================================================
   * v-list & v-list-item
   * ====================================================================
   */
  'v-list': {
    target: 'ul',
    base: 'bg-white rounded-md p-2 shadow',
    props: {
      dense: { _boolean: 'p-1' },
      rounded: { _boolean: 'rounded-lg' },
      flat: { _boolean: 'shadow-none' },
    },
  },
  'v-list-item': {
    target: 'li',
    base: 'flex items-center px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-pointer',
    props: {
      active: { _boolean: 'bg-blue-100 text-blue-600' },
      dense: { _boolean: 'py-1 text-sm' },
      nav: { _boolean: 'mx-2' }, // Common style for nav lists is some margin
      disabled: { _boolean: 'opacity-50 cursor-not-allowed' },
    },
  },

  /**
   * ====================================================================
   * v-row & v-col
   * ====================================================================
   */
  'v-row': {
    target: 'div',
    base: 'flex flex-wrap -mx-2', // Negative margin to create gutters
    props: {
      'no-gutters': { _boolean: 'mx-0' },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        'space-between': 'justify-between',
        'space-around': 'justify-around',
      },
    },
  },
  'v-col': {
    target: 'div',
    base: 'w-full px-2', // Padding to create gutters, default to full width
    props: {
      // The script will automatically handle responsive prefixes like `md:`
      cols: {
        '1': 'w-1/12', '2': 'w-2/12', '3': 'w-3/12', '4': 'w-4/12', '5': 'w-5/12', '6': 'w-6/12',
        '7': 'w-7/12', '8': 'w-8/12', '9': 'w-9/12', '10': 'w-10/12', '11': 'w-11/12', '12': 'w-full',
      },
      offset: {
        '1': 'ml-1/12', '2': 'ml-2/12', '3': 'ml-3/12', '4': 'ml-4/12', '5': 'ml-5/12', '6': 'ml-6/12',
        '7': 'ml-7/12', '8': 'ml-8/12', '9': 'ml-9/12', '10': 'ml-10/12', '11': 'ml-11/12',
      },
    },
  },

  /**
   * ====================================================================
   * v-btn
   * ====================================================================
   */
  'v-btn': {
    target: 'button',
    base: 'inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
    props: {
      color: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
        error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      },
      outlined: { _boolean: 'border border-current bg-transparent' },
      rounded: { _boolean: 'rounded-full' },
      size: {
        small: 'px-2.5 py-1.5 text-xs',
        default: 'px-4 py-2 text-sm',
        large: 'px-6 py-3 text-base',
      },
    },
  },

  /**
   * ====================================================================
   * v-card & family
   * ====================================================================
   */
  'v-card': {
    target: 'div',
    base: 'bg-white shadow-lg rounded-lg overflow-hidden',
    props: {
      elevation: {
        '0': 'shadow-none', '1': 'shadow-sm', '2': 'shadow', '3': 'shadow-md',
        '4': 'shadow-lg', '5': 'shadow-xl', '6': 'shadow-2xl',
      },
      outlined: { _boolean: 'border' },
    },
  },
  'v-card-title': { target: 'h3', base: 'text-lg font-semibold p-4', props: {} },
  'v-card-text': { target: 'div', base: 'p-4', props: {} },
  'v-card-actions': { target: 'div', base: 'p-4 flex justify-end items-center space-x-2', props: {} },

  /**
   * ====================================================================
   * v-alert
   * ====================================================================
   */
  'v-alert': {
    target: 'div',
    base: 'p-4 rounded-md border',
    props: {
      type: {
        success: 'bg-green-50 border-green-400 text-green-800',
        info: 'bg-blue-50 border-blue-400 text-blue-800',
        warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
        error: 'bg-red-50 border-red-400 text-red-800',
      },
      outlined: { _boolean: 'bg-transparent' },
    },
  },
};

