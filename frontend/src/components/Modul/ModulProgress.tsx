import { Button, Progress } from 'antd'

export default function ModulProgress() {
  const moduleCellStyle = {
    padding: '13px',
    width: '272px',
    border: '1px solid black', // Menambahkan garis bawah pada sel-sel modul
    borderLeft: 'none',
  }

  const subCellStyle = {
    width: '272px',
    padding: '13px 21px 9px 12px',
    borderBottom: 'none', // Menghilangkan garis bawah pada sel-sel submodul
    borderLeft: 'none',
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

  const maxHeight = '500px' // Sesuaikan dengan tinggi maksimum yang Anda inginkan

  return (
    <div
      className="mx-[62px] w-[294.5px]  border-black rounded-[5px] shadow-md shadow-black"
      style={{ maxHeight, overflowY: 'scroll' }}
    >
      <div className="w-[273px]  border-2 pl-[13px] pr-[16px] pt-[26px] pb-[41px] border-black border-y-0 border-l-0">
        <h1>Progress</h1>
        {/* Progress bar */}
        <Progress percent={30} size="small" className="" />
      </div>
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
      <div className="border-2 border-black w-[273px] p-[13px] text-left font-bold pb-4 border-l-0">
        Final Quiz
      </div>
      <div className="border-2 border-black w-[273px] p-10 text-left font-bold pb-4 border-y-0 border-l-0"></div>
    </div>
  )
}
