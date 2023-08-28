import React from 'react'
import { Collapse } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

const options = [
  '1. Lorem ipsum dolor sit amet',
  '2. consectetur adipiscing elit',
  '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  '4. Proin condimentum aliquet arcu',
  '5. sit amet eleifend tortor',
  '6. Fusce aliquet malesuada quam',
]
const card = {
  backgroundImage: "url('./static/icons/bank/card.png')",
}
const { Panel } = Collapse

export default function CreditComp() {
  return (
    <div>
      <div>
        <h1 className="pt-[17px] flex items-center">
          <ArrowLeftOutlined style={{ marginRight: '8px' }} />
          <span>Kartu Kredit / Debit</span>
        </h1>
      </div>
      <div>
        <div>
          <div className="flex gap-x-[277px]">
            <p>NoKartu</p>
            <div className="w-full h-5 bg-no-repeat" style={card}></div>
          </div>
          <input type="text" placeholder='1234 5678 90' className="w-full h-[36px]" />
        </div>
        <div className="flex gap-[53px] mt-6">
          <div>
            <p>Masa Berlaku</p>
            <input type="text" className='h-[36px]' placeholder='Masa Berlaku'/>
          </div>
          <div>
            <p>CVV</p>
            <input type="text" className='h-[36px]' placeholder='CVV'/>
          </div>
        </div>
      </div>
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
