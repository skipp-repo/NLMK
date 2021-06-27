import React from 'react'
import './PagesList.css'

const PagesList = () => {
  return (
    <div className="PagesList">
      <ul>
        <li>
          <a href="./popup.html">Поп-ап</a>
        </li>
        <li>
          <a href="./main.html">Словари / Глоссарии / Документы </a>
        </li>
      </ul>
    </div>
  )
}

export default React.memo(PagesList)
