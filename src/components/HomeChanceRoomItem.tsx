"use client"
import React from "react"
import Button from "./Button"
import Image from "next/image"
import { useContractReads } from "wagmi"
import {
  mainAbi,
  secondAbiFB6,
  secondAbi1Bd,
  secondAbi2a2,
  secondAbi3a8,
  secondAbi478,
  secondAbi77D,
  secondAbiBC3,
  secondAbidDe,
} from "@/assets/abis/mainAbis"
import { nftType } from "@/types/nft"
import dynamic from "next/dynamic"
const NoSSRZero = dynamic(() => import("../components/ui/Zero"), { ssr: false })

type ChanceRoomItemProps = {
  contractAddress: `0x${string}` | undefined
  i: number | string
  handleClickOpen: (nft: any) => void
  nft?: any
}

function addressToAbi(index: number | string) {
  if (index == 0) return secondAbiFB6
  if (index == 1) return secondAbiBC3
  if (index == 2) return secondAbi77D
  if (index == 3) return secondAbi2a2
  if (index == 4) return secondAbi478
  if (index == 5) return secondAbidDe
  if (index == 6) return secondAbi3a8
  if (index == 7) return secondAbi1Bd
}

const HomeChanceRoomItem = ({ nft, handleClickOpen, i, contractAddress }: ChanceRoomItemProps) => {
  const [initialRenderComplete, setInitialRenderComplete] = React.useState(false)
  React.useEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true)
  }, [])
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      //@ts-ignore
      {
        address: contractAddress,
        //@ts-ignore
        abi: secondAbiBC3,
        functionName: "status",
      },
      //@ts-ignore
      {
        address: contractAddress,
        //@ts-ignore
        abi: secondAbiBC3,
        functionName: "layout",
      },
      //@ts-ignore
    ],
  })

  //@ts-ignore
  const timstamp = `${data?.at(1)?.result?.Uint256?.deadLine.toString().slice(0, -1)}${"0000"}`
  // console.log(timstamp, "ts")
  const deadtime = new Date(
    //@ts-ignore
    parseInt(timstamp),
  )

  function logg() {
    //@ts-ignore
    // console.log(data[1]?.result["Uint256"].maximumTicket)
    //@ts-ignore
    console.log(data)
  }
  function handlePopUp() {
    handleClickOpen({
      name: "sang",
      spainDate: `${deadtime.getDay()} ${deadtime.toLocaleString("default", {
        month: "long",
      })} -${deadtime.getHours()}:${deadtime.getMinutes()}`,
      suplly: `${//@ts-ignore
      data[1]?.result["Uint256"].maximumTicket.toString()}/${//@ts-ignore
      data[1]?.result["Uint256"].soldTickets.toString()}`,
      price: data //@ts-ignore
        ? !parseInt(data[1]?.result["Uint256"].ticketPrice.toString().slice(0, -1)) / 10 ** 18
          ? "0"
          : //@ts-ignore
            parseInt(data[1]?.result["Uint256"].ticketPrice.toString().slice(0, -1)) / 10 ** 18
        : null,
    })
  }

  if (!initialRenderComplete) {
    // Returning null will prevent the component from rendering, so the content will simply be missing from
    // the server HTML and also wont render during the first client-side render.
    return null
  } else {
    const date = new Date()
    return (
      <div key={i} className=" w-[23rem] flex flex-col items-center ">
        <button onClick={logg}>logg</button>

        {isLoading ? (
          <span>loading..</span>
        ) : (
          <React.Fragment>
            <Image src={"/dumyNft.png"} alt="Simp" width={360} height={380} />
            <p className="font-zen text-xl mt-3">{nft?.name}</p>
            <p className="flex">
              <span className="font-pop font-bold text-[28px]">Spain date: </span>
              <span className="font-pop font-[500] text-[26px] flex flex-col">
                <span>
                  {deadtime.getDay()}
                  {deadtime.toLocaleString("default", { month: "long" })}
                </span>
              </span>
            </p>
            <p className="font-pop font-normal text-[26px]">
              <span className="w-full text-center">
                {"-"}
                {deadtime.getHours()}
                {":"}
                {deadtime.getMinutes()}
                {"utc"}
              </span>
            </p>
            <p>
              <span className="font-pop font-bold text-[28px]">suplly: </span>
              <span className="font-pop font-[500] text-[26px]">
                {//@ts-ignore
                data[1]?.result["Uint256"].maximumTicket.toString()}
                {"/"}
                {//@ts-ignore
                data[1]?.result["Uint256"].soldTickets.toString()}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-pop font-bold text-[28px]">price:</span>
              <span className="font-pop font-[500] text-[26px]">
                {/* @ts-ignore */}
                {data ? ( //@ts-ignore
                  !parseInt(data[1]?.result["Uint256"].ticketPrice.toString().slice(0, -1)) /
                  10 ** 18 ? (
                    <span>0</span>
                  ) : (
                    //@ts-ignore
                    parseInt(data[1]?.result["Uint256"].ticketPrice.toString().slice(0, -1)) /
                    10 ** 18
                  )
                ) : null}
                <span className="font-pop font-normal text-[26px]">Matic</span>
              </span>
            </p>
          </React.Fragment>
        )}

        <Button scale="0.66" onClick={handlePopUp}>
          ADD
        </Button>
        <a
          href={`https://polygonscan.com/address/${contractAddress}`}
          target="_blank"
          className=" mt-[60px] text-[13px] text-primary cursor-pointer"
        >
          view on opensea
        </a>
      </div>
    )
  }
}

export default HomeChanceRoomItem
