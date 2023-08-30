import { FC } from "react"

interface ParagraphProps {
  isConnected: boolean
  address?: string
}

const Paragraph: FC<ParagraphProps> = ({ isConnected, address }) => {
  return (
    <p className=" font-semibold text-[33px] leading-10 duration-700 font-pop">
      {isConnected ? address?.slice(0, 4) : "0XLOOY"}
    </p>
  )
}

export default Paragraph
