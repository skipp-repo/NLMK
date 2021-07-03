import React from 'react'
import clsx from 'clsx'
import Highlighter from 'react-highlight-words'
import './TranslationCardWord.css'
import { ReactComponent as SpeechIcon } from '../../../assets/icons/speech.svg'

export type TranslationCardWordProps = JSX.IntrinsicElements['div'] & {
  input?: string
  children: string
  speech: boolean
  onSpeech(): void
}

const TranslationCardWord: React.FC<TranslationCardWordProps> = ({
  children,
  className,
  input = '',
  speech,
  onSpeech = () => {},
  ...props
}) => {
  return (
    <div {...props} className={clsx('TranslationCardWord', className)}>
      <Highlighter
        highlightClassName="TranslationCardWord_highlight"
        searchWords={[input]}
        autoEscape={true}
        textToHighlight={children}
      />
      {speech && (
        <div className="TranslationCardWord-speech" onClick={onSpeech}>
          <SpeechIcon />
        </div>
      )}
    </div>
  )
}

export default React.memo(TranslationCardWord)
