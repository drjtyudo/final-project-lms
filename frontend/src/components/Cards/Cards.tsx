import { EyeOutlined, StarOutlined, CommentOutlined } from '@ant-design/icons'

interface ICards {
  image: string
  title: string
  titlePelatihan: String
  description: string
  bank: string
  iconBank: string[]
  totalViews: string
  averageRating: string
  comment: string
  harga: string
  dibuat_oleh: string
  level: string
  id: string
}

const Cards = {
  CardKategori: (props: ICards) => {
    const { image, title, description } = props
    return (
      <div className="w-[250px] rounded-[10px] shadow-[0_40px_60px_0px_rgba(32,77,132,0.1)]">
        <img
          className="rounded-tl-[10px] h-[255px] rounded-tr-[10px]"
          src={image}
          alt=""
        />
        <div className="px-2 py-3">
          <h5 className="my-2 text-[20px] font-bold">{title}</h5>
          <p className="text-[#424242] text-[14px]">{description}</p>
        </div>
      </div>
    )
  },
  CardPelatihan: (props: ICards) => {
  
    const {
      image,
      titlePelatihan,
      harga,
      description,
      totalViews,
      averageRating,
      comment,
      dibuat_oleh,
      level,
    } = props
    return (
      <div className="w-[317px] rounded-[10px] shadow-[0_40px_60px_0px_rgba(32,77,132,0.1)]">
        <img
          className="rounded-tl-[10px] bg-cover w-full rounded-tr-[10px] h-[135px]"
          src={image}
          alt=""
        />
        <div className="px-2 py-3 h-[360px]">
          <h5 className="my-2 text-[20px] font-bold">{titlePelatihan}</h5>
          <p className="text-[#424242] text-[14px] overflow-auto h-[150px]">{description}</p>
          <div className="text-[11px]">
            <p>Dibuat Oleh: {dibuat_oleh} </p>
            <p>Level: {level}</p>
          </div>
          <div className="flex">
            <div className="flex gap-4">
              <div className="flex gap-2">
                <EyeOutlined style={{ fontSize: '16px' }} />{' '}
                <span>{totalViews}</span>
              </div>
              <div className="flex gap-2">
                <StarOutlined style={{ fontSize: '16px' }} />{' '}
                <span>{averageRating}</span>
              </div>
              <div className="flex gap-2">
                <CommentOutlined style={{ fontSize: '16px' }} />{' '}
                <span>{comment}</span>
              </div>
            </div>
            <div className="flex-grow text-right ">
              <p>Rp. {harga}</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  CardBenefit: () => {
    const listItems = [
      '5 bahan bacaan',
      'Kuis yang dapat dikerjakan',
      '4 menit total video pembelajaran',
      '5 konten dapat diunduh',
      'Sertifikat dapat diunduh',
    ]
    return (
      <div>
        <div className="w-full my-2 p-3 border">
          <h1 className="font-bold text-[18px]">
            Yang anda dapatkan di pelatihan ini:
          </h1>
          <ul className="list-disc flex flex-wrap gap-x-[350px] ml-8">
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
  CardPembayaran: (props: ICards) => {
    const { bank, iconBank } = props
    return (
      <div className="h-[116px]">
        <div className="my-[16px]">{bank}</div>
        <div className="gap-[25px] w-[55px] flex">
          {iconBank.map((iconPath, index) => (
            <img
              key={index}
              src={iconPath}
              alt={bank}
              className="mr-1 bg-contain mt-2 cursor-pointer"
            />
          ))}
        </div>
      </div>
    )
  },
}

export default Cards
