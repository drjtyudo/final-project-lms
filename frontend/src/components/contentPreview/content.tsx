import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Content = {
  contentSub1: () => {
    const [content, setContent] = useState([])

    const getContent = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pelatihan/1')
        const modules = Array.from(response.data.pelatihan.Modules)
        const allSubModules = modules.flatMap((module) => module.SubModules[0])
        setContent(
          allSubModules.flatMap((content) => content.KontenPembahasans),
        )
      } catch (error) {
        console.log(error)
      }
    }
    console.log(content)
    useEffect(() => {
      getContent()
    }, [])
    return (
      <>
        <div className="border-2 w-full overflow-y-scroll h-[550px] p-5">
          {content.map((data, index) => (
            <div key={index}>
              <div>
                <h1 className="text-[25px]">
                  <span>| {data.judul_pembahasan}</span>
                </h1>
              </div>
              <div className="ps-[15px]">
                <p className="text-justify">{data.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  },
  contentSub2: () => {
    const [content, setContent] = useState([])

    const getContent = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pelatihan/1')
        const modules = Array.from(response.data.pelatihan.Modules)
        const allSubModules = modules.flatMap((module) => module.SubModules)
        setContent(allSubModules[1].KontenPembahasans)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getContent()
    }, [])
    // console.log(content)
    return (
      <>
        <div className="border-2 w-full overflow-y-scroll h-[550px] p-5">
          {content.map((data, index) => (
            <div key={index}>
              <div>
                <h1 className="text-[25px]">
                  <span>|</span> {data.judul_pembahasan}
                </h1>
              </div>
              <div className="ps-[15px]">
                <p className="text-justify">{data.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  },
}

export default Content
