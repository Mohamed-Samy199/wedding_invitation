// بيانات العروسين — عدّلها من هنا فقط
export const COUPLE = {
  groom: 'يوسف',
  bride: 'روفايدة',
};

// الحرف الأول من كل اسم (الهمزات تتحول لألف عادية عشان الشكل في المونوجرام)
const initialOf = (name) => name[0].replace(/[أإآ]/g, 'ا');

export const COUPLE_INITIALS = {
  groom: initialOf(COUPLE.groom),
  bride: initialOf(COUPLE.bride),
};

// موعد الفرح — عدّله من هنا فقط
export const EVENT = {
  weekday: 'الأحد',
  date: '20 / 11 / 2026',
  period: 'مساء',
  time: '7:00',
};
