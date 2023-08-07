interface ICards {
  image: string
  title: string
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
}

export default Cards
