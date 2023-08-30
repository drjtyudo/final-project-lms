import { Button } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export function ModulComp({ onSubmoduleClick }) {
  const moduleCellStyle = {
    padding: '13px',
    width: '272px',
    border: '1px solid black',
  };

  const subCellStyle = {
    width: '272px',
    padding: '13px 21px 9px 12px',
    borderBottom: 'none',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
  };

  const buttonTableStyle = {
    width: '100%',
    border: '1px solid black',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: '400',
  };

  const lockedButtonStyle = {
    ...buttonTableStyle,
    backgroundColor: 'grey',
    color: '#fff',
    backgroundImage: "url('./static/icons/lock.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 15px center',
    pointerEvents: 'none',
    cursor: 'not-allowed',
  };

  const [modules, setModules] = useState([]);
  const [SubModules, setSubModules] = useState([]);

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      getModules()
    }
  }, [id])

  const getModules = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/pelatihan/${id}`);
      console.log(response.data.pelatihan.Modules);
      setModules(response.data.pelatihan.Modules);
      const allSubModules = modules.flatMap((module) => module.SubModules);
      setSubModules(allSubModules);
      console.log({ SubModules });
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ modules, SubModules });

  useEffect(() => {
    getModules();
  }, []);

  return (
    <div className="mr-[52px] overflow-y-scroll h-[550px]">
      {modules.map((module, index) => (
        <table key={index} className="border-collapse text-left">
          <tbody>
            <tr>
              <th style={moduleCellStyle}>{module.module}</th>
            </tr>
            {module.SubModules.map((submodule, subIndex) => {
              const isSubmodule1Or2InModul1 =
                index === 0 && (subIndex === 2 || subIndex === 3);
              const isLocked = isSubmodule1Or2InModul1 || index !== 0;
              const dynamicButtonStyle = isLocked
                ? lockedButtonStyle
                : buttonTableStyle;
              return (
                <tr key={subIndex}>
                  <td style={subCellStyle}>
                    <Button
                      style={dynamicButtonStyle}
                      disabled={isLocked}
                      onClick={() => onSubmoduleClick(subIndex)}
                    >
                      {submodule.judul}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}
      <div className="border-2 w-[274px] p-[13px] text-left font-bold">
        Final Quiz
      </div>
    </div>
  );
  
}
