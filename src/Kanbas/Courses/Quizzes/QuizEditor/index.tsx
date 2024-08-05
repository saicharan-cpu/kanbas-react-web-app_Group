import React, { useState } from 'react'
import QuizDetailsEditor from './QuizDetailsEditor'
import QuizQuestionEditor from './QuestionsEditor'

export default function QuizEditor () {
  const [activeTab, setActiveTab] = useState('details')

  return (
    <div>
      <ul className='nav nav-tabs'>
        <li className='nav-item'>
          <button
            className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
        </li>
        <li className='nav-item'>
          <button
            className={`nav-link ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => setActiveTab('questions')}
          >
            Questions
          </button>
        </li>
      </ul>

      <div className='tab-content'>
        {activeTab === 'details' && (
          <div className='tab-pane active'>
            <QuizDetailsEditor />
          </div>
        )}
        {activeTab === 'questions' && (
          <div className='tab-pane active'>
            <QuizQuestionEditor />
          </div>
        )}
      </div>
    </div>
  )
}
