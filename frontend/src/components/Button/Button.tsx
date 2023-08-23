import React from 'react'
import { Button } from 'antd'

function ButtonImg({ text, style }) {
  return (
    <div>
      <Button
        size="large"
        className=" text-black flex items-center justify-center h-[45px] w-[260px]"
      >
        <div
          className="img w-full h-full bg-no-repeat bg-contain"
          style={style}
        />
        {text}
      </Button>
    </div>
  )
}

export default ButtonImg
