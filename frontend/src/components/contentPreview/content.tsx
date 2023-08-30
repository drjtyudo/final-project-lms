import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Content = {
  contentSub1: () => {
    const [content, setContent] = useState([])

    const getContent = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pelatihan/1')
        const modules = Array.from(response.data.pelatihan.Modules)
        const allSubModules = modules.flatMap((module) => module.SubModules);
        console.log({CONTENT : allSubModules.flatMap((content) => content.KontenPembahasans) });      
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getContent()
    },[])
    return (
      <>
        <div className="border-2 w-full overflow-y-scroll h-[550px] p-5">
          <div>
            <h1 className="text-[25px]">
              <span>|</span> Introduction
            </h1>
          </div>
          <div className="ps-[15px]">
            <p className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et
              explicabo molestias iusto nam a blanditiis dolorem omnis maiores
              soluta aperiam unde ab nostrum nobis rerum, ducimus perferendis ut
              necessitatibus! Amet repudiandae natus maxime, itaque animi facere
              impedit quo excepturi tempora consequuntur quam, cupiditate et ad
              architecto rerum exercitationem harum illo totam quaerat adipisci
              nulla? Esse recusandae, magni commodi eum molestiae velit aperiam
              ex ipsam illo qui voluptatum, consequatur, impedit nulla? Sunt
              voluptates ea quibusdam odit veniam libero, cumque deleniti
              corporis velit quos! Numquam adipisci tempora necessitatibus
              deserunt. Aliquam consequuntur fugit consectetur dolore maiores
              dolorum officia facere, unde sit dolorem temporibus. Voluptas qui
              animi quaerat nulla aspernatur repudiandae inventore sint magnam
              rerum placeat dolorum dolore ea quam facilis nihil, pariatur iusto
              saepe. Ratione molestias quam reprehenderit, corporis, reiciendis
              labore praesentium ut consequatur eius amet modi possimus
              asperiores? Dolorum fugiat earum molestiae ad amet quae distinctio
              minima harum sunt. Voluptatibus fuga, at tenetur odio autem,
              voluptate libero nihil similique, necessitatibus expedita dolorum
              voluptas sunt ab excepturi fugiat ipsum cupiditate illo rem non.
              Ut natus asperiores aut eum quibusdam, et iusto quasi quo!
              Exercitationem asperiores unde voluptatibus! Blanditiis amet,
              error, reiciendis dolore iste molestias, a placeat voluptas
              commodi officiis similique itaque aperiam tempora!
            </p>
          </div>
        </div>
      </>
    )
  },
  contentSub2: () => {
    return (
      <>
        <div className="border-2 w-full overflow-y-scroll h-[550px] p-5">
          <div>
            <h1 className="text-[25px]">
              <span>|</span> Install NextJS
            </h1>
          </div>
          <div className="ps-[15px]">
            <p>Sub Modul 2</p>
          </div>
        </div>
      </>
    )
  },
}

export default Content
