import { FC } from "react"
import Loader2 from "../assets/img/loader-2.svg"
// import Loader2 from "../assets"
import Yellow from "../assets/img/yellow.svg"
import Clip from "../assets/img/Clip2.svg"
import { cn } from "@/lib/utils"
import { twMerge } from "tailwind-merge"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  scale?: string
  fontW?: string
  styless?: string
  disable?: boolean
}

const Button: FC<ButtonProps> = ({
  children,
  isLoading,
  scale = "1",
  styless,
  fontW,
  disable,
  ...props
}) => {
  return (
    <div
      // className="relative duration-800 w-56 active:translate-x-[2px] active:translate-y-[2px] transition-colors  disabled:opacity-50 disabled:pointer-events-none scaleres"
      className={twMerge(
        "relative h-[4rem] flex justify-center items-center  duration-800 w-56 active:translate-x-[2px] active:translate-y-[2px] transition-colors  disabled:opacity-50 disabled:pointer-events-none scaleres",
        styless,
      )}
      style={{
        transform: `scale(${scale})`,
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? 0.8 : 1,
      }}
    >
      <Yellow className=" bg-[#EDD136] w-[255px] h-[67px] rounded-3xl absolute z-0" />
      <Clip className="rounded-3xl absolute z-10" />
      <button
        {...props}
        disabled={isLoading}
        // className=" bg-gray-100 hover:bg-gray-200 duration-300 ease-linear absolute z-20 w-[256px]  -translate-x-[4px] h-[62px] -translate-y-[4px] border-[3px] border-zinc-900 rounded-3xl"
        style={{
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
        className={cn(
          ` bg-gray-100 hover:bg-gray-200 duration-200 ease-linear absolute z-20 w-[256px]  -translate-x-[4px] h-[62px] -translate-y-[4px] border-[3px] border-zinc-900 rounded-3xl ${
            !isLoading ? "active:translate-y-[2px]" : null
          }`,
        )}
      >
        {isLoading ? (
          <div className="w-full flex justify-center items-center bg-slate-300 h-full rounded-3xl ">
            {disable ? (
              <span className="font-bold text-[28px]">{children}</span>
            ) : (
              <Loader2 className="mr-2 animate-spin scale-120" />
            )}
          </div>
        ) : null}
        {!isLoading ? (
          <p
            className={twMerge(
              "flex justify-center font-bold text-[28px] leading-9 text-center",
              fontW,
            )}
            style={{}}
          >
            {children}
          </p>
        ) : null}
      </button>
    </div>
  )
}

export default Button
