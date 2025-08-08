// Simple translations helper (not used in base code, optional)
const translations = {
  ar: {
    subjects: "المواد الدراسية",
    back: "رجوع",
    videoPlaylists: "قوائم التشغيل",
    pastExamPapers: "نماذج الامتحانات",
    studyTips: "نصائح للدراسة"
  },
  en: {
    subjects: "Subjects",
    back: "Back",
    videoPlaylists: "Video Playlists",
    pastExamPapers: "Past Exam Papers",
    studyTips: "Study Tips"
  }
};

export function t(lang, key) {
  return translations[lang][key] || key;
}
