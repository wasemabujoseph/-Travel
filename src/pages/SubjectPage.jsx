import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

export default function SubjectPage(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [subject, setSubject] = useState(null)

  useEffect(()=>{
    const list = JSON.parse(localStorage.getItem('diraasti_subjects')||'[]')
    const s = list.find(x=>String(x.id)===String(id))
    if(!s) { navigate('/') ; return }
    setSubject(s)
  },[id])

  useEffect(()=>{
    if(!subject) return
    const list = JSON.parse(localStorage.getItem('diraasti_subjects')||'[]')
    const idx = list.findIndex(x=>x.id===subject.id)
    if(idx>-1){ list[idx]=subject; localStorage.setItem('diraasti_subjects', JSON.stringify(list)) }
  },[subject])

  if(!subject) return null

  const addTopic = ()=>{
    const t = prompt('أدخل اسم الموضوع')
    if(!t) return
    setSubject({...subject, topics:[...(subject.topics||[]), {id:Date.now(), title:t, done:false}]})
  }
  const toggle = (tid)=> setSubject({...subject, topics: subject.topics.map(x=> x.id===tid? {...x, done:!x.done}:x)})
  const removeTopic = tid=> setSubject({...subject, topics: subject.topics.filter(x=>x.id!==tid)})

  const progress = (()=> {
    const total = subject.topics.length || 0
    const done = subject.topics.filter(t=>t.done).length
    return total? Math.round((done/total)*100): 0
  })()

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">{subject.name}</h2>
          <p className="text-sm">التقدم: {progress}%</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addTopic} className="px-3 py-2 bg-indigo-600 text-white rounded">أضف موضوع</button>
          <Link to="/" className="px-3 py-2 bg-gray-200 rounded">رجوع</Link>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">قائمة المواضيع</h3>
        <ul className="space-y-2">
          {subject.topics.map(t=>(
            <li key={t.id} className="flex justify-between items-center p-2 border rounded">
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-xs text-gray-500">ملاحظات: {t.notes||'—'}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>toggle(t.id)} className="px-2 py-1 bg-green-500 text-white rounded">{t.done? 'عاد':'تم'}</button>
                <button onClick={()=>removeTopic(t.id)} className="px-2 py-1 bg-red-100 rounded">حذف</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
