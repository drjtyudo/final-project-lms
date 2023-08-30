import React from 'react'
import { Collapse } from 'antd'

const { Panel } = Collapse

const ATM = (
  <ul>
    <li className="font-normal">
      1. Select other transaction on the main menu
    </li>
    <li className="font-normal">2. Select transfer</li>
    <li className="font-normal">3. Select to BCA Virtual Account</li>
    <li className="font-normal">4. Insert the BCA Virtual Account number</li>
    <li className="font-normal">5. Select the payable amount then confirm</li>
    <li className="font-normal">6. Payment Complete</li>
  </ul>
)
const KlikBCA = (
  <ul>
    <li className="font-normal">
      1. Select other transaction on the main menu
    </li>
    <li className="font-normal">2. Select transfer</li>
    <li className="font-normal">3. Select to BCA Virtual Account</li>
    <li className="font-normal">4. Insert the BCA Virtual Account number</li>
    <li className="font-normal">5. Select the payable amount then confirm</li>
    <li className="font-normal">6. Payment Complete</li>
  </ul>
)
const mBCA = (
  <ul>
    <li className="font-normal">
      1. Select other transaction on the main menu
    </li>
    <li className="font-normal">2. Select transfer</li>
    <li className="font-normal">3. Select to BCA Virtual Account</li>
    <li className="font-normal">4. Insert the BCA Virtual Account number</li>
    <li className="font-normal">5. Select the payable amount then confirm</li>
    <li className="font-normal">6. Payment Complete</li>
  </ul>
)
const items = [
  {
    key: '1',
    header: 'How to Pay',
    ATMText: ATM, // Add nested content for the first panel
    KlikBCAText: KlikBCA,
    mBCAText: mBCA,
  },
]

export function MyCollapse() {
  return (
    <Collapse bordered={false} defaultActiveKey={['1']} className="mx-5">
      {items.map((item) => (
        <Panel key={item.key} header={item.header} className="font-bold">
          {item.ATMText && (
            <Collapse bordered={false}>
              <Panel key="nested1" header="ATM BCA">
                {item.ATMText}
              </Panel>
              <Panel key="nested2" header="Klik BCA">
                {item.KlikBCAText}
              </Panel>
              <Panel key="nested3" header="m-BCA">
                {item.mBCAText}
              </Panel>
            </Collapse>
          )}
        </Panel>
      ))}
    </Collapse>
  )
}
