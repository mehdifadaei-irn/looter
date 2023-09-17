"use client"
import React, { PureComponent, useEffect, useState } from "react"
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts"

import Lottie from "lottie-react"

import Stopper from "../../assets/img/home/stopper.svg"
import spiner from "../../assets/img/lottie/spinner.json"
import Image from "next/image"
import Button from "../Button"
import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Skeleton } from "@mui/material"

import { useContractEvent, useContractRead, useAccount } from "wagmi"
import { secondAbiBC3 } from "@/assets/abis/mainAbis"
import { stringToColour } from "@/lib/generateColorFromHash"

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
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? "start" : "end"

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#fff"}>
        {payload.name.slice(0, 8)}
      </text>
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
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
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
        fontSize: 28,
        fontWeight: 500,
      }}
    >
      {index == 0 ? "you" : ""}
    </text>
  )
}

const Spinner = ({ contractAddress }: { contractAddress: `0x${string}` }) => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [state, setState] = useState(0) //0 1 2 3
  const [stop, setStop] = useState(false) //0 1 2 3
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([])

  //@ts-ignore
  const [COLORS, setCOLORS] = useState([stringToColour(address?.toString()), "#333", "#fff"])
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
    abi: secondAbiBC3,
    functionName: "layout",
  })

  const {
    data: Events,
    isLoading: EventLoading,
    mutate,
  } = useMutation({
    mutationKey: ["getEvents", `${contractAddress}`],
    mutationFn: async () => {
      const { data } = await axios.post(
        "https://deep-index.moralis.io/api/v2/0x00000b324663D7982e44f87a3F6bf077EdA21c2f/events?chain=polygon&topic=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
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
            "X-API-Key": "EdsCkBJOaqTx83e6llMMYYZFCpggnK5N1rTi2Sk1k47ZNpvLzcSSJ8MCkfWOz4ht",
            "Content-Type": "application/json",
          },
        },
      )

      return data
    },
    onSuccess(data) {
      //@ts-ignore
      const TotalTickets: number = parseInt(contractDataLayout?.Uint256?.maximumTicket)
      let amo: number = 0
      const pied = data.result.reduce((acc: { name: string; value: number }[], cur: any) => {
        const address: `0x${string}` = cur.data.to.toString()
        // console.log(address)
        //@ts-ignore
        if (acc[address]) {
          amo++
          if (address !== contractAddress) {
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
          acc[contractAddress] = TotalTickets - amo + 1
        }

        return acc
      }, {})
      const arr = Object.entries(pied).map(([key, value]) => ({ [key]: value }))
      //@ts-ignore
      setPieData(arr.map((obj) => ({ name: Object.keys(obj)[0], value: Object.values(obj)[0] })))
      // console.log(arr)
    },
  })

  // const interval = setInterval(() => {
  //   if (state < 3) {
  //     if (state == 3) {
  //       setState(0)
  //       return
  //     }
  //     if (stop != true) {
  //       setState((prev) => prev + 1)
  //     }
  //   } else {
  //     console.log("s")
  //     setState(0)
  //   }
  // }, 500)

  // React.useEffect(() => {
  //   if (stop == true) {
  //     return
  //   }
  //   return () => clearInterval(interval)
  // }, [state])

  useEffect(() => {
    mutate()
  }, [])

  function logg() {
    // let ekh = Math.abs(state - 4) + 1
    // let secs = ekh == 0 ? 0 : (ekh - 1) * 500 + 50
    // console.log(ekh)
    // setTimeout(() => {
    //   console.log(Math.abs(1 - state))
    //   setStop(true)
    // }, secs)
    //@ts-ignore
    // console.log(parseInt(contractDataLayout?.Uint256?.maximumTicket))
    console.log(pieData, "p")
    // console.log(data, "d")
  }
  // console.log(pieData)

  // useContractEvent({
  //   address: "0x00000b324663D7982e44f87a3F6bf077EdA21c2f",
  //   abi: secondAbiBC3,
  //   eventName: "Transfer",
  //   listener(log) {
  //     console.log(log, "e")
  //   },
  // })

  return (
    <div className="relative xl:w-[47%] w-full flex flex-col items-center">
      {!isLoading ? (
        <Image
          alt="nft1"
          src={metaData?.normalized_metadata.image}
          width={250}
          height={250}
          className="opacity-70 z-100 pt-14"
        />
      ) : (
        <div className="relative xl:w-[47%] w-full flex flex-col items-center">
          <Skeleton
            animation="wave"
            width={350}
            height={280}
            variant="rounded"
            sx={{ mt: "56px" }}
          />
        </div>
      )}

      <div className="absolute w-full h-full flex justify-center items-center">
        {/* <Stopper className=" tra absolute" />
        <Lottie animationData={spiner} loop={true} className="z-30 spinnerr" /> */}
        {/* Spinner */}
        <div className="w-full h-full absolute flex justify-center items-center -top-[7rem] -left-[4rem] ">
          {/* <button onClick={logg} className="absolute cursor-pointer" style={{ zIndex: 200 }}>
            logg
          </button> */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                activeIndex={0}
                // activeShape={renderActiveShape}
                data={pieData}
                cx="60%"
                cy="50%"
                innerRadius={220}
                outerRadius={260}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
                label={renderCustomizedLabel}
                paddingAngle={3}
              >
                {pieData.map((entry: any, index: any) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="bg-white absolute  translate-x-5 -translate-y-2">
            <Stopper className=" tra absolute" />
          </div>
        </div>

        {/* Spin */}
      </div>
      <div className="absolute w-full  flex justify-center items-center bottom-[12%] z-50">
        <Image
          alt="hand"
          src={"/hand.png"}
          className="translate-x-9 z-40"
          width={70}
          height={50}
        />
        <Button styless="" scale="0.8">
          Start
        </Button>
      </div>
    </div>
  )
}

export default Spinner
