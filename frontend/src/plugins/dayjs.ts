import dayjs from 'dayjs';
import 'dayjs/locale/en';

export function configureDayjs() {
  dayjs.locale('en', {
    name: 'en',
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    ordinal: function ordinal(n) {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return "[" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
    }
  });
}