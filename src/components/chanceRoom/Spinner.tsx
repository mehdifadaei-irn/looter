"use client"
import React, { useEffect, useState } from "react"
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts"

import Image from "next/image"
import Button from "../Button"
import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Skeleton } from "@mui/material"
import { useSelector } from "react-redux"

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

const Spinner = ({ contractAddress }: { contractAddress: `0x${string}` }) => {
  const { address, isConnecting, isDisconnected } = useAccount()
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
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{
          fontSize: 23,
          fontWeight: 500,
        }}
      >
        {/* @ts-ignore */}
        {name.toLocaleLowerCase() === address.toLocaleLowerCase()
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
      console.log(TotalTickets, "tot")
      let amo: number = 0
      console.log(data, "events111")
      const pied = data.result.reduce((acc: any, cur: any) => {
        const address: `0x${string}` = cur.data.to.toString()
        console.log(address, "5a")
        if (data.result.length == 1) {
          acc[contractAddress] = TotalTickets
        } else {
          //@ts-ignore
          if (address.toLocaleLowerCase() !== contractAddress.toLocaleLowerCase()) {
            //@ts-ignore
            if (acc[address]) {
              amo++
              if (address != contractAddress) {
                //@ts-ignore
                acc[address.toString()]++
              }
            } else {
              amo++
              if (address.toLocaleLowerCase() != contractAddress.toLocaleLowerCase()) {
                // console.log("hey")
                //@ts-ignore
                acc[address] = 1
              }
              //@ts-ignore
              acc[contractAddress] = TotalTickets - amo
            }
          }
        }
        return acc
      }, {})

      const arr = Object.entries(pied).map(([key, value]) => ({ [key]: value }))
      // console.log(arr)
      //@ts-ignore
      setPieData(arr.map((obj) => ({ name: Object.keys(obj)[0], value: Object.values(obj)[0] })))
      // console.log(arr)
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
            WinnerIndex: 0,
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
  useEffect(() => {}, [])

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

  // console.log(pieData, "picData")

  return (
    <div className="relative xl:w-[37%] min-w-[38rem] xl:ml-0 w-full flex flex-col items-center ">
      <div className=" flex justify-center absolute top-[3.6rem] xl:left-[42%]  left-[50%]">
        {!isLoading ? (
          <Image
            alt="nft1"
            src={
              metaData?.normalized_metadata.image.toString().slice(0, 4) == "http"
                ? "https://ipfs.io/ipfs/QmT37EzSmQSUV1iMxxBBmG5T3WAt15rfPZvQfajEhsVATF/pfp0_5566.png"
                : metaData?.normalized_metadata.image
            }
            width={250}
            height={250}
            className={`opacity-70 z-100  `}
          />
        ) : (
          <Skeleton
            animation="wave"
            width={280}
            height={280}
            variant="rounded"
            // sx={{ mt: "56px" }}
          />
        )}
      </div>

      <div className="absolute w-full h-full flex justify-center 2xl:-top-[10rem] xl:-top-[8rem] -top-[9rem] xl:-left-[0rem] left-8">
        <div className="w-full h-full flex justify-center items-center  ">
          <ResponsiveContainer
            width="120%"
            height="100%"
            className={`flex justify-center items-center`}
          >
            <PieChart width={600} height={300}>
              <Pie
                activeIndex={WinnerIndex}
                activeShape={renderActiveShape}
                data={pieData}
                cx="60%"
                cy="50%"
                innerRadius={200}
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
          <div className="absolute w-[70%] h-[70%] translate-x-10">
            <Needle
              pieData={pieData}
              isStarted={isStarted}
              //@ts-ignore
              totalSupply={parseInt(contractDataLayout?.Uint256?.maximumTicket)}
              contractAddress={contractAddress}
            />
          </div>
        </div>
      </div>
      {/* Spin */}
      <div className="absolute w-[70%]  flex flex-col justify-center items-center bottom-[10%] z-50">
        <div className="flex">
          <Image
            alt="hand"
            src={"/hand.png"}
            className="translate-x-9 z-40"
            width={80}
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
            isLoading={btnDisable}
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
