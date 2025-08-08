import React, {useEffect, useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FirebaseContext } from '../firebaseInit'

export default function Home(){
  const { t } = useTranslation()
  const fb = useContext(FirebaseContext)
  const [subjects, setSubjects] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('diraasti_subjects')||'[]') } catch(e){return []}
  })

  // when fb.user available, try load remote data and merge
  useEffect(()=>{
    async function syncLoad(){
      if(!fb || !fb.user) return
      try{
        const remote = await fb.loadUserData(fb.user.uid)
        if(remote && Array.isArray(remote.subjects)){
          // merge without overwriting local modifications unless remote is newer (no timestamps here, so we prioritize remote)
          setSubjects(remote.subjects)
          localStorage.setItem('diraasti_subjects', JSON.stringify(remote.subjects))
        }
      }catch(e){ console.error('sync load', e) }
    }
    syncLoad()
  }, [fb && fb.user])

  // when subjects change, save local and remotely (if logged in)
  useEffect(()=>{
    localStorage.setItem('diraasti_subjects', JSON.stringify(subjects))
    async function remoteSave(){
      if(!fb || !fb.user) return
      try{
        await fb.saveUserData(fb.user.uid, { subjects })
      }catch(e){ console.error('remote save', e) }
    }
    remoteSave()
  }, [subjects, fb && fb.user])

  const add = () => {
    const name = prompt(t('subject_name'))
    if(!name) return
    setSubjects(s => [...s, {id:Date.now(), name, topics:[], progress:0}])
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">📚 {t('home')}</h2>
          <p className="text-sm text-gray-500">تابع تقدمك، أضف مواردك، واحفظ التقدّم عبر الأجهزة.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={add} className="px-4 py-2 bg-green-600 text-white rounded">أضف مادة</button>
          <a href="/src/curatedResources.json" target="_blank" className="px-4 py-2 bg-gray-100 rounded">عرض الموارد المجمّعة</a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map(s=>(
          <div key={s.id} className="p-4 bg-white rounded shadow">
            <h3 className="font-bold text-lg">{s.name}</h3>
            <p className="text-sm mt-2">المواضيع: {s.topics?.length || 0}</p>
            <div className="mt-3 flex gap-2">
              <Link to={'/subject/'+s.id} className="px-3 py-1 bg-indigo-600 text-white rounded">فتح</Link>
              <button onClick={()=>{ setSubjects(subjects.filter(x=>x.id!==s.id)) }} className="px-3 py-1 bg-gray-200 rounded">حذف</button>
            </div>
          </div>
        ))}
        {subjects.length===0 && <div className="col-span-full p-6 bg-white rounded shadow text-gray-500">لا توجد مواد بعد — أضف مادة للبدء.</div>}
      </div>
    </div>
  )
}
