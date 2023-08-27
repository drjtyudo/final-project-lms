import { EyeOutlined, StarOutlined, CommentOutlined } from '@ant-design/icons'

interface ICards {
  image: string
  title: string
  titlePelatihan: String
  description: string
}

const Cards = {
  CardKategori: (props: ICards) => {
    const { image, title, description } = props
    return (
      <div className="w-[250px] rounded-[10px] shadow-[0_40px_60px_0px_rgba(32,77,132,0.1)]">
        <img
          className="rounded-tl-[10px] rounded-tr-[10px]"
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
    const { image, titlePelatihan, description } = props
    return (
      <div className="w-[317px] rounded-[10px] shadow-[0_40px_60px_0px_rgba(32,77,132,0.1)]">
        <img
          className="rounded-tl-[10px] rounded-tr-[10px] h-[135px]"
          // src={image}
          alt=""
        />
        <div className="px-2 py-3">
          <h5 className="my-2 text-[20px] font-bold">{titlePelatihan}</h5>
          <p className="text-[#424242] text-[14px]">{description}</p>
          <div className="text-[11px]">
            <p>Dibuat Oleh:</p>
            <p>Untuk:</p>
          </div>
          <div className='flex'>
            <div className="flex gap-4">
              <div className="flex gap-2">
                <EyeOutlined style={{ fontSize: '16px' }} /> <span>3</span>
              </div>
              <div className="flex gap-2">
                <StarOutlined style={{ fontSize: '16px' }} /> <span>4,8</span>
              </div>
              <div className="flex gap-2">
                <CommentOutlined style={{ fontSize: '16px' }} /> <span>3</span>
              </div>
            </div>
            <div className='flex-grow text-right '>
              <p>Rp.1000000</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export default Cards
