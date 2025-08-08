import React from 'react'
import curated from '../curatedResources.json'

export default function Resources(){
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📚 المكتبة المجمّعة</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {Object.keys(curated).map(key=>(
          <div key={key} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg">{key}</h3>
            <p className="text-sm mb-2">{curated[key].summary}</p>
            <div className="space-y-2">
              <div>
                <div className="font-medium">ملفات</div>
                <ul className="list-disc mr-5">
                  {curated[key].files.map((f,i)=> <li key={i}><a className="text-indigo-600" href={f.link} target="_blank" rel="noreferrer">{f.title}</a></li>)}
                </ul>
              </div>
              <div>
                <div className="font-medium">فيديوهات</div>
                <ul className="list-disc mr-5">
                  {curated[key].videos.map((v,i)=> <li key={i}><a className="text-indigo-600" href={v.link} target="_blank" rel="noreferrer">{v.title}</a></li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
