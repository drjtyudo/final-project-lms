import { Button } from 'antd'
import React from 'react'

export function ModulComp() {
  const moduleCellStyle = {
    padding: '13px',
    width: '272px',
    border: '1px solid black', // Menambahkan garis bawah pada sel-sel modul
  }

  const subCellStyle = {
    width: '272px',
    padding: '13px 21px 9px 12px',
    borderBottom: 'none', // Menghilangkan garis bawah pada sel-sel submodul
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
  }

  const buttonTableStyle = {
    width: '100%',
    border: '1px solid black', // Menghapus border
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'start',
    fontSize: '16px',
    fontWeight: '400',
  }

  const moduleData = [
    {
      name: 'Modul 1',
      submodules: ['Sub Modul 1', 'Sub Modul 2', 'Sub Modul 3', 'Sub Modul 4'],
    },
    {
      name: 'Modul 2',
      submodules: ['Sub Modul 1', 'Sub Modul 2', 'Sub Modul 3', 'Sub Modul 4'],
    },
  ]

  return (
    <div className="mx-[62px]">
      {moduleData.map((module, index) => (
        <table key={index} className="border-collapse text-left">
          <tbody>
            <tr>
              <th style={moduleCellStyle}>{module.name}</th>
            </tr>
            {module.submodules.map((submodule, subIndex) => (
              <tr key={subIndex}>
                <td style={subCellStyle}>
                  <Button style={buttonTableStyle}>{submodule}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
      <div className="border-2 border-black w-[274px] p-[13px] text-left font-bold">
        Final Quiz
      </div>
    </div>
  )
}
