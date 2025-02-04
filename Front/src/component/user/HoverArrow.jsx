import React, {useState} from 'react'

const HoverArrow = ({children}) => {
    const [isbgArrowImg, setIsbgArrowImg] = useState(false);

    if(!children){
        console.warn("content가 비어있습니다.")
    }
  return (
    <p 
        className={`bgArrowImg ${isbgArrowImg ? 'bgArrowImgHover' : ''}`}
        onMouseEnter={()=> setIsbgArrowImg(true)}
        onMouseLeave={()=>setIsbgArrowImg(false)}
    >
        {children}    
    </p>
  );
}

export default HoverArrow