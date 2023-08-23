import BannerIklan from 'components/BannerIklan/BannerIklan'
import Slider from 'components/Slider/Slider'
import React from 'react'

function Home() {
  return (
    <div>
      <BannerIklan />
      <div className="px-[50px]">
        <Slider.SliderKategori
          title="Kategori Pelatihan"
          deskripsi="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium perferendis numquam soluta dolor sapiente eveniet, autem ipsam modi culpa deserunt porro illo voluptates iste debitis repudiandae impedit, itaque asperiores perspiciatis?"
        />
        <Slider.SliderPelatihan
          title="Kategori Pelatihan"
          deskripsi="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium perferendis numquam soluta dolor sapiente eveniet, autem ipsam modi culpa deserunt porro illo voluptates iste debitis repudiandae impedit, itaque asperiores perspiciatis?"
        />
      </div>
    </div>
  )
}

export default Home
