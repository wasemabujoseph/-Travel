import React, { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import SubjectPage from './pages/SubjectPage'
import Resources from './pages/Resources'
import Settings from './pages/Settings'
import { useTranslation } from 'react-i18next'
import { FirebaseContext } from './firebaseInit'

export default function App(){
  const { t, i18n } = useTranslation()
  const toggleLang = () => {
    const next = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(next)
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
  }
  const fb = useContext(FirebaseContext)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <div className="flex">
        <aside className="w-80 bg-white/80 backdrop-blur-md shadow h-screen p-6 flex flex-col">
          <div>
            <h1 className="text-2xl font-extrabold mb-1">دراستي</h1>
            <p className="text-sm text-gray-500">Course Section • توجيهي ٢٠٠٨</p>
          </div>

          <nav className="mt-6 space-y-2 flex-1">
            <Link to="/" className="block p-2 rounded hover:bg-gray-100">🏠 {t('home')}</Link>
            <Link to="/resources" className="block p-2 rounded hover:bg-gray-100">📚 {t('resources')}</Link>
            <Link to="/settings" className="block p-2 rounded hover:bg-gray-100">⚙️ {t('settings')}</Link>
          </nav>

          <div className="space-y-3">
            <button onClick={toggleLang} className="w-full px-3 py-2 bg-indigo-600 text-white rounded">{t('toggle_lang')}</button>

            {fb && fb.loading ? (
              <div className="text-sm text-gray-500">Checking sync…</div>
            ) : fb && fb.user ? (
              <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                <div>
                  <div className="text-sm font-medium">{fb.user.displayName}</div>
                  <div className="text-xs text-gray-500">متزامن</div>
                </div>
                <button onClick={() => fb.signOut()} className="text-sm text-red-600">تسجيل خروج</button>
              </div>
            ) : (
              <div>
                <div className="text-sm text-gray-500">لم تقم بتسجيل الدخول</div>
                <button onClick={() => fb.signIn()} className="w-full mt-2 px-3 py-2 bg-blue-600 text-white rounded">تسجيل دخول Google</button>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-400 mt-4">المزامنة اختيارية — البيانات محفوظة محليًا إذا لم تفعل</div>
        </aside>

        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/subject/:id" element={<SubjectPage/>} />
            <Route path="/resources" element={<Resources/>} />
            <Route path="/settings" element={<Settings/>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
