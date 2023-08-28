import React from 'react'
import { Collapse } from 'antd'

const options = [
  '1. Lorem ipsum dolor sit amet',
  '2. consectetur adipiscing elit',
  '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  '4. Proin condimentum aliquet arcu',
  '5. sit amet eleifend tortor',
  '6. Fusce aliquet malesuada quam',
]
const qr = {
  backgroundImage: "url('./static/images/qrCode.png')",
  marginTop: '138px',
}
const { Panel } = Collapse

export default function EwalletComp() {
  return (
    <div>
      <div>
        <h1 className="pt-[17px]">Gopay</h1>
        <div className="w-[300px] h-[300px] m-auto mt-[13px] mb-[35px] bg-cover bg-no-repeat" style={qr}></div>
      </div>
      <hr />
      <div className="my-5">
        <Collapse accordion>
          <Panel header="How To Play" key="how-to-play">
            <ul>
              {options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </Panel>
        </Collapse>
      </div>
      <hr />
      <div className="w-full py-[10px] mt-[18px] bg-white">
        <h1 className="text-center">Back to Merchant</h1>
      </div>
    </div>
  )
}
