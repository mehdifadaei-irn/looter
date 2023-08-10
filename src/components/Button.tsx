import { FC } from "react"
import Loader2 from "../assets/img/loader-2.svg"
import Yellow from "../assets/img/yellow.svg"
import Clip from "../assets/img/Clip2.svg"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

const Button: FC<ButtonProps> = ({ children, isLoading, ...props }) => {
  return (
    <div
      className=" relative duration-800 w-56  active:translate-x-[2px] active:translate-y-[2px] transition-colors  disabled:opacity-50 disabled:pointer-events-none scaleres"
      style={
        {
          // transform: "scale(0.90)"
        }
      }
    >
      <Yellow className=" bg-[#EDD136] w-[255px] h-[67px] rounded-3xl absolute z-0  translate-x-1 translate-y-1" />
      <Clip className="rounded-3xl absolute z-10" />
      <button
        {...props}
        className=" bg-gray-100 hover:bg-gray-200 duration-300 ease-linear absolute z-20 w-[256px]  -translate-x-[4px] h-[62px] -translate-y-[4px] border-[3px] border-zinc-900 rounded-3xl       "
      >
        {isLoading ? <Loader2 className="mr-2 animate-spin" /> : null}
        <p className=" font-bold text-[24px] leading-9 text-center">{children}</p>
      </button>
    </div>
  )
}

export default Button
