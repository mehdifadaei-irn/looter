import { FC } from "react"

interface ParagraphProps {
  isConnected: boolean
  address?: string
}

const Paragraph: FC<ParagraphProps> = ({ isConnected, address }) => {
  return (
    <p className=" font-bold text-[29px] leading-10 duration-700 font-pop translate-y-[3px]">
      {isConnected ? address?.slice(0, 4) : "0XLOOY"}
    </p>
  )
}

export default Paragraph
