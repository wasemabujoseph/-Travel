import React, { useState } from "react";
import curatedResources from "../curatedResources.json";

export default function App() {
  const [lang, setLang] = useState("ar");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const toggleLang = () => {
    setLang(lang === "ar" ? "en" : "ar");
    setSelectedSubject(null);
  };

  const subjects = curatedResources.subjects;

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`min-h-screen p-6 ${
        lang === "ar" ? "text-right" : "text-left"
      } bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}
    >
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {lang === "ar"
            ? "دراستي – توجيهي جيل ٢٠٠٨"
            : "Diraasti – Tawjihi Generation 2008"}
        </h1>
        <button
          onClick={toggleLang}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {lang === "ar" ? "English" : "العربية"}
        </button>
      </header>

      {!selectedSubject ? (
        <>
          <h2 className="text-xl font-semibold mb-4">
            {lang === "ar" ? "المواد الدراسية" : "Subjects"}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <li
                key={subject.id}
                onClick={() => setSelectedSubject(subject)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setSelectedSubject(subject);
                }}
                className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded shadow hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-semibold mb-1">
                  {subject.name[lang]}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lang === "ar"
                    ? "اضغط للدخول إلى الموارد والتقدم"
                    : "Click to view resources and progress"}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <SubjectDashboard
          subject={selectedSubject}
          lang={lang}
          goBack={() => setSelectedSubject(null)}
        />
      )}

      <Tips lang={lang} tips={curatedResources.tips[lang]} />
    </div>
  );
}

function SubjectDashboard({ subject, lang, goBack }) {
  return (
    <section>
      <button
        onClick={goBack}
        className="mb-4 text-blue-600 hover:underline focus:outline-none"
      >
        {lang === "ar" ? "◀ رجوع" : "◀ Back"}
      </button>
      <h2 className="text-3xl font-bold mb-6">{subject.name[lang]}</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          {lang === "ar" ? "قوائم التشغيل" : "Video Playlists"}
        </h3>
        <ul className="list-disc list-inside space-y-1">
          {subject.playlists.map((pl, idx) => (
            <li key={idx}>
              <a
                href={pl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {pl.title[lang]}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          {lang === "ar" ? "نماذج الامتحانات" : "Past Exam Papers"}
        </h3>
        <ul className="list-disc list-inside space-y-1">
          {subject.pastPapers.map((paper, idx) => (
            <li key={idx}>
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {lang === "ar"
                  ? `امتحان سنة ${paper.year}`
                  : `Exam Year ${paper.year}`}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

function Tips({ lang, tips }) {
  return (
    <footer className="mt-12 p-4 bg-gray-100 dark:bg-gray-800 rounded">
      <h3 className="text-lg font-semibold mb-2">
        {lang === "ar" ? "نصائح للدراسة" : "Study Tips"}
      </h3>
      <ul className="list-disc list-inside space-y-1 text-sm">
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </footer>
  );
}
