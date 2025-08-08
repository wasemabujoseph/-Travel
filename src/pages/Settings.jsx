import React from 'react'

export default function Settings(){
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">⚙️ الإعدادات</h2>
      <p className="mb-2">يمكنك تفعيل المزامنة مع Firebase لتخزين البيانات عبر الأجهزة.</p>
      <ol className="list-decimal mr-6">
        <li>أنشئ مشروع Firebase وفعل Google Sign-In</li>
        <li>انسخ متغيرات التكوين إلى <code>.env.local</code></li>
      </ol>
    </div>
  )
}
