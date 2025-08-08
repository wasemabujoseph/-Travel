import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ar: {
    translation: {
      home: 'الرئيسية',
      resources: 'الموارد',
      settings: 'الإعدادات',
      toggle_lang: 'Switch to English',
      add_subject: 'أضف مادة',
      subject_name: 'اسم المادة',
      add_topic: 'أضف موضوع',
      mark_done: 'وضع كمُكتمل'
    }
  },
  en: {
    translation: {
      home: 'Home',
      resources: 'Resources',
      settings: 'Settings',
      toggle_lang: 'التبديل إلى العربية',
      add_subject: 'Add Subject',
      subject_name: 'Subject name',
      add_topic: 'Add topic',
      mark_done: 'Mark as done'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'ar',
  fallbackLng: 'ar',
  interpolation: { escapeValue: false },
})

export default i18n
