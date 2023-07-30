import React from 'react'
import Typewriter from 'typewriter-effect';
import './typewriter.css'
const TypewriterEffect = ({text}) => {
  return (
    <Typewriter
    options={{
        strings:text,
        autoStart:true,
        loop:true,
        skipAddStyles:true,
        wrapperClassName:'just',
        cursorClassName:'curser'
    }}
    
     
    />
  )
}

export default TypewriterEffect