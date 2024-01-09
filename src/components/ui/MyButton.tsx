import Loader2 from "../../assets/img/loader-2.svg"
import * as React from "react"
import { ButtonSVG, SmButtonSVG } from "../Icons"
import { twMerge } from "tailwind-merge"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  IHeight: number
  IWidth: number
  sm?: boolean
}

const MyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading, IWidth, IHeight, sm = false, ...props }, ref) => {
    return (
      <button
        className={twMerge(
          "relative flex justify-center items-center md:hover:scale-x-[1.014] md:hover:scale-y-[1.008] duration-200 md:active:scale-[0.98] lg:scale-100 scale-[0.92] ",
          className,
        )}
        ref={ref}
        disabled={isLoading}
        style={{
          cursor: isLoading ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.7 : 1,
          height: IHeight,
          width: IWidth,
        }}
        {...props}
      >
        {sm ? (
          <SmButtonSVG className="absolute z-0" width={IWidth} height={IHeight} />
        ) : (
          <ButtonSVG className="absolute z-0" width={IWidth} height={IHeight} />
        )}

        <span className="z-10 flex mb-[4%] mr-[5%] absolute">
          {isLoading ? <Loader2 className="mt-1 mr-1 animate-spin scale-120" /> : null}
          {children}
        </span>
      </button>
    )
  },
)
MyButton.displayName = "Button"

export { MyButton }
