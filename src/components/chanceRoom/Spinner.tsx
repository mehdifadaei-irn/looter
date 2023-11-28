"use client"
import React, { useEffect, useState } from "react"
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts"

import Image from "next/image"
import Button from "../Button"
import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Skeleton } from "@mui/material"
import { useSelector } from "react-redux"
import Loader2 from "../../assets/img/loader-2.svg"

import {
  useContractEvent,
  useContractRead,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useBalance,
} from "wagmi"
import { mainAbi } from "@/assets/abis/mainAbis"
import { stringToColour } from "@/lib/generateColorFromHash"
import Needle from "./Needle"
import { toast } from "sonner"
import { formatEther, parseEther } from "viem"
import { polygon } from "wagmi/chains"
import { chanceRoomAbi } from "@/assets/abis/samp2"
import { useDispatch } from "react-redux"
import { setWinner } from "@/redux/slices/winnerSelcet"
import { MyButton } from "../ui/MyButton"

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)

  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 1
  const ey = my
  const textAnchor = cos >= 0 ? "start" : "end"

  return (
    <g>
      {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#fff"}>
        {payload.name.slice(0, 8)}
      </text> */}
      {/* <p>{payload.name}</p> */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      {/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" /> */}
      {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}

      <text x={ex + (cos >= 0 ? 1 : -1) * 0.4} y={ey} dy={1} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

const RADIAN = Math.PI / 180
const edr = true

const Spinner = ({ contractAddress }: { contractAddress: `0x${string}` }) => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [WinIndex, setWinIndex] = useState(null)
  const [TimeLeft, setTimeLeft] = useState<string | null>(null) //0 1 2 3
  const [isStarted, setIsStarted] = useState<boolean>(false) //0 1 2 3
  const [status, setStatus] = useState<string[]>([])
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([])
  const [btnDisable, setBtnDisable] = useState<boolean>(false)

  //@ts-ignore
  const { Winner, addressOfContract, WinnerIndex } = useSelector((state) => state.winner)
  const dispatch = useDispatch()

  const curentData = new Date()
  const TimeStampNow = curentData.getTime()

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
    ...props
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    return (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{
          fontSize: 23,
          fontWeight: 500,
          zIndex: 300,
          opacity: 1,
        }}
      >
        {name.toLocaleLowerCase() == address?.toLocaleLowerCase()
          ? "you"
          : name.slice(2, 5) === "000"
          ? percent == 0
            ? ""
            : "empty"
          : name.slice(0, 6)}
      </text>
    )
  }
  const onPieEnter = (_: any, index: any) => {
    // setState(index)
  }

  const { data: metaData, isLoading }: { data: any; isLoading: boolean } = useQuery({
    queryKey: ["getMetadata", `${contractAddress}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://deep-index.moralis.io/api/v2.2/nft/${contractAddress}/0?chain=polygon&format=decimal&normalizeMetadata=true&media_items=false`,
        {
          headers: {
            accept: "application/json",
            "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          },
        },
      )

      return data
    },
  })
  const { data: contractDataLayout, isLoading: isLayoutLoading } = useContractRead({
    address: contractAddress,
    abi: mainAbi,
    functionName: "layout",
  })
  const { data: StautsData, isLoading: isSatusLoading } = useContractRead({
    address: contractAddress,
    abi: mainAbi,
    functionName: "status",
    onSuccess(data: string[]) {
      setStatus(data)
    },
  })
  // console.log(status)

  const {
    data: Events,
    isLoading: EventLoading,
    mutate,
  } = useMutation({
    mutationKey: ["getEvents", `${contractAddress}`],
    mutationFn: async () => {
      const { data } = await axios.post(
        `https://deep-index.moralis.io/api/v2/${contractAddress}/events?chain=polygon&topic=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef`,
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "from", type: "address" },
            { indexed: true, internalType: "address", name: "to", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          },
        },
      )

      return data
    },
    onSuccess(data) {
      //@ts-ignore
      const TotalTickets: number = parseInt(contractDataLayout?.Uint256?.maximumTicket)

      let mainArrayData = data.result
      mainArrayData.pop()

      let firstArr: any = []
      let compList: string[] = []

      mainArrayData.map((item: any, i: any) => {
        if (!compList.includes(item.data.tokenId)) {
          for (let index = TotalTickets; index > 0; index--) {
            if (item.data.tokenId == index) {
              firstArr.push(item)
              compList.push(index.toString())
              break
            }
          }
        }
      })

      let emptyRemain = TotalTickets - compList.length

      let pied = firstArr.reduce((acc: any, cur: any) => {
        let addressTo: string = cur.data.to.toString()

        if (cur.data.to === "0x0000000000000000000000000000000000000000") {
          emptyRemain++
        } else {
          if (acc[addressTo]) {
            acc[addressTo.toString()]++
          } else {
            acc[addressTo] = 1
          }
        }
        return acc
      }, {})
      pied[contractAddress] = emptyRemain

      // console.log(pied, "PIECKE")

      const arr = Object.entries(pied).map(([key, value]) => ({ [key]: value }))
      // console.log(arr)
      let marpiData = arr.map((obj) => ({
        name: Object.keys(obj)[0],
        value: Object.values(obj)[0],
      }))
      //@ts-ignore
      setPieData(arr.map((obj) => ({ name: Object.keys(obj)[0], value: Object.values(obj)[0] })))
      // console.log(arr)
      //@ts-ignore
      // setWinIndex((prev: any) => {

      // })

      marpiData.map((pi, i: any) => {
        // console.log(pi,Winner,"re")
        if (pi.name.toString().toLowerCase() == Winner.toString().toLowerCase()) {
          console.log("how")
          setWinIndex(i)
        }
      })
    },
  })

  const {
    data: WinnerAddr,
    isError,
    refetch,
  } = useContractRead({
    address: contractAddress,
    abi: chanceRoomAbi,
    functionName: "winner",
    chainId: polygon.id,
  })

  useEffect(() => {
    if (!isLayoutLoading) {
      //@ts-ignore
      let tim = parseInt(contractDataLayout?.Uint256?.deadLine) * 10e2 - TimeStampNow
      // console.log(tim)
      if (tim > 0) {
        const result = new Date(tim * 1000).toISOString().slice(11, 19)
        // console.log(result)
        setTimeLeft(result)
      }
    }
    // console.log(status)
    if (status[0] === "Sold out") {
      if (status[1] === "Waiting for roll up") {
        setBtnDisable(false)
      } else if (status[1] === "Winner selected") {
        dispatch(
          setWinner({
            addressOfContract: contractAddress,
            //@ts-ignore
            Winner: WinnerAddr[1],
            WinnerIndex: 1,
          }),
        )
        setBtnDisable(true)
      } else {
        setIsStarted(true)
        setBtnDisable(true)
      }
    } else if (status[0] === "Deadline execude") {
      setBtnDisable(true)
    } else {
      setBtnDisable(true)
    }
    if (status.length !== 0) {
      toast(`${status[0]}\n${status[1]}`)
    }
  }, [isLayoutLoading, isSatusLoading, status])

  useEffect(() => {
    mutate()
  }, [])

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: mainAbi,
    functionName: "rollup",
    chainId: polygon.id,
    args: [],
    value: parseEther("0.5"),
  })
  const { data, isLoading: rollUpLoading, isSuccess, write } = useContractWrite(config)

  function handleStart() {
    if (status[0] === "Sold out") {
      if (status[1] === "Waiting for roll up" || status[1] === "Winner selected") {
      } else {
        setIsStarted(true)
        return
      }
    }
    write?.()
  }
  useEffect(() => {
    if (isSuccess) {
      setIsStarted(true)
    }
  }, [rollUpLoading])

  // console.log(pieData)

  // useContractEvent({
  //   address: "0x00000b324663D7982e44f87a3F6bf077EdA21c2f",
  //   abi: mainAbi,
  //   eventName: "Transfer",
  //   listener(log) {
  //     console.log(log, "e")
  //   },
  // })
  useContractEvent({
    address: contractAddress,
    abi: mainAbi,
    eventName: "Rollup",
    listener(log) {
      // console.log(log)
      setIsStarted(true)
    },
  })
  useContractEvent({
    address: contractAddress,
    abi: mainAbi,
    eventName: "Transfer",
    listener(log) {
      // console.log(log)
      toast("fetching new Users...")
      mutate()
    },
  })

  function logg() {
    console.log(WinIndex, "pie")
  }

  return (
    <div className="relative w-1/2 flex flex-col items-center ">
      {/* <button onClick={logg} className="z-[100] absolute">
        logg
      </button> */}
      {/* <div className="w-[700px] h-[700px] bg-slate-600">

      </div> */}
      <div className="flex justify-center absolute h-[473px] sm:translate-x-[17px] translate-x-[43px] 2xl:translate-y-[-45px] translate-y-[-30px] z-10 opacity-70 min-w-[500px]">
        {!isLoading ? (
          <Image
            alt="nft1"
            src={
              metaData?.normalized_metadata.image.toString().slice(0, 4) == "http"
                ? "https://ipfs.io/ipfs/QmT37EzSmQSUV1iMxxBBmG5T3WAt15rfPZvQfajEhsVATF/pfp0_5566.png"
                : metaData?.normalized_metadata.image
            }
            width={482}
            height={5000}
            className={`opacity-70 z-100 xl:scale-100 scale-90 rounded-full `}
          />
        ) : (
          <Skeleton
            animation="wave"
            width={450}
            height={450}
            variant="circular"
            // sx={{ mt: "56px" }}
          />
        )}
      </div>

      <div className="absolute w-[320px] h-[320px] flex justify-center items-center sm:translate-x-[17px] translate-x-[55px] 2xl:translate-y-[28px] translate-y-[43px] z-[200]">
        <Needle
          pieData={pieData}
          isStarted={isStarted}
          //@ts-ignore
          totalSupply={parseInt(contractDataLayout?.Uint256?.maximumTicket)}
          contractAddress={contractAddress}
        />
      </div>

      <div className="absolute w-full h-full flex justify-center 2xl:-top-[156px]  -top-[9rem] xl:scale-100 scale-90 z-10">
        <div className="flex justify-center items-center   w-[700px] h-[700px]  z-10">
          {/* EventLoading */}
          {EventLoading ? (
            <div className="z-[600] w-full flex justify-center items-center scale-[9] translate-x-[2.3rem]">
              <Loader2 className="mt-1 mr-1 animate-spin " />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart
                width={300}
                height={300}
                className={`flex justify-center items-center  sm:-translate-x-[3.3rem] -translate-x-[1.3rem] `}
              >
                <Pie
                  className="opacity-70"
                  //@ts-ignore
                  activeIndex={WinIndex}
                  activeShape={renderActiveShape}
                  data={pieData}
                  cx="60%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={240}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  label={renderCustomizedLabel}
                  paddingAngle={2}
                >
                  {pieData.map((entry: any, index: any) => (
                    <Cell key={`cell-${index}`} fill={stringToColour(entry.name)} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      {/* Spin */}
      <div className="absolute w-[70%]  flex flex-col justify-center items-center bottom-[5%] z-50 ">
        <div className="flex">
          <Image
            alt="hand"
            src={"/hand.png"}
            className="translate-x-9 z-40"
            width={100}
            height={50}
          />

          <MyButton
            IHeight={100}
            IWidth={240}
            type="button"
            className={`my-2 ${!write ? "opacity-70" : "opacity-100"}`}
            onClick={handleStart}
            disabled={btnDisable}
            // disabled
            // isLoading={btnDisable}
          >
            <span className="w-[230px] h-[90px] flex justify-center items-center font-semibold text-[1.2rem]">
              {TimeLeft ? `${status[1]?.slice(-13)}` : "spin"}
            </span>
          </MyButton>
        </div>
        {/* <span>Time Left: (1:20:30)</span> */}
      </div>
    </div>
  )
}

export default Spinner
