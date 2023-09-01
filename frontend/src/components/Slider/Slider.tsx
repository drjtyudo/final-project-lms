import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from 'components/Cards/Cards';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface ISlider {
  title: string;
  deskripsi: string;
}

const Slider = {
  SliderKategori: (props: ISlider) => {
    const { title, deskripsi } = props;
    const [kategori, setKategori] = useState([]);
    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(() => {
      getKategori();
    }, []);

    const getKategori = async () => {
      try {
        const data = await axios.get('http://localhost:8000/kategori')
        setKategori(data.data.response)
      } catch (error) {
        console.log(error);
      }
    };

    const goPrev = () => {
      if (swiperInstance) {
        swiperInstance.slidePrev();
      }
    };

    const goNext = () => {
      if (swiperInstance) {
        swiperInstance.slideNext();
      }
    };

    return (
      <div className="mt-[100px] pb-10">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 className="text-[30px] font-bold text-[#1D1E1E] border-l-[7px] border-[#ffaf20] px-3">
            {title}
          </h1>
          <div className="flex justify-between">
            <p className="w-[80%] py-5 font-normal text-[#424242]">{deskripsi}</p>
            <Link href="/tampilkanKategori">
              <button className="bg-[#10455B] text-white font-bold h-[50px] w-[180px] rounded-[50px] mt-4">
                Tampilkan semua
              </button>
            </Link>
          </div>
        </div>
        <Swiper
          slidesPerView="5"
          spaceBetween={30}
          freeMode
          pagination={{
            dynamicBullets: true,
          }}
          modules={[FreeMode, Navigation, Pagination]}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
        >
          <Button
            className="bg-[#dee7ff] rounded-full w-[40px] h-[40px] absolute top-[130px] z-10 "
            onClick={goPrev}
          >
            <LeftOutlined />
          </Button>
          <Button
            className="bg-[#273763] rounded-full w-[40px] h-[40px] absolute top-[130px] z-10 right-[15px]"
            onClick={goNext}
          >
            <RightOutlined />
          </Button>
          {kategori.map((data) => (
            <SwiperSlide key={data.id}>
              <Cards.CardKategori
                image={data.url_image}
                title={data.kategori}
                titlePelatihan=""
                description={data.deskripsi}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  },
  SliderPelatihan: (props: ISlider) => {
    const { title, deskripsi } = props;
    const [pelatihan, setPelatihan] = useState([]);

    const getPelatihan = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pelatihan');
        setPelatihan(response.data.pelatihan);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getPelatihan();
    }, []);

    return (
      <div className="mt-[100px] pb-10">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 className="text-[30px] font-bold text-[#1D1E1E] border-l-[7px] border-[#ffaf20] px-3">
            {title}
          </h1>
          <div className="flex justify-between">
            <p className="w-[80%] py-5 font-normal text-[#424242]">{deskripsi}</p>
            <button className="bg-[#10455B] text-white font-bold h-[50px] w-[180px] rounded-[50px] mt-4">
              Tampilkan semua
            </button>
          </div>
        </div>
        <Swiper
          slidesPerView="4"
          spaceBetween={30}
          freeMode
          pagination={{
            dynamicBullets: true,
          }}
          modules={[FreeMode, Navigation, Pagination]}
        >
          {pelatihan.map((data) => (
            <SwiperSlide key={data.id}>
              <Link href={`/beliPengetahuan?id=${data.id}`} passHref>
                <Cards.CardPelatihan
                  key={data.id}
                  titlePelatihan={data.judul}
                  image={data.image_url}
                  description={data.deskripsi}
                  harga={data.harga}
                  dibuat_oleh={data.dibuat_oleh}
                  level={data.level}
                  totalViews={data.totalViews}
                  averageRating={data.averageRating}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  },
};

export default Slider;
