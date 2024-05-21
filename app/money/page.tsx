"use client";

import { Button, Dialog, TextField } from "@mui/material";
import html2canvas from "html2canvas";
import { useEffect, useMemo, useRef, useState } from "react";
import { Rubik, Noto_Sans } from "next/font/google";
import dayjs, { Dayjs } from "dayjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DateRangePicker from "@/components/base/DateRangePicker";

enum Shop {
  QianHai,
  Meituan,
}

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

type Data = {
  month: string;
  sum: string;
  days: {
    shop: Shop;
    time: string;
    num: string;
    originPrice?: string;
    refound?: boolean;
    isWeekend: boolean;
    disable?: boolean;
  }[];
};

const Money = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [dateRange, setDateRange] = useState<Dayjs[]>([]);
  const container = useRef<HTMLDivElement | null>(null);
  const [shop, setShop] = useState(Shop.Meituan);
  const [dataURL, setDataURL] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const filteredData = useMemo(() => {
    return data
      .map((item) => {
        return { ...item, days: item.days.filter((item) => !item.disable) };
      })
      .filter((item) => !!item.days.length);
  }, [data]);
  const createImage = () => {
    html2canvas(container.current!, { useCORS: true }).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      const event = new MouseEvent("click");
      a.download = `sosovalue.png`;
      a.href = dataURL;
      a.dispatchEvent(event);
      a.remove();
    });
  };
  const preview = () => {
    html2canvas(container.current!).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      setDataURL(dataURL);
      setOpen(true);
    });
  };
  const generateData = () => {
    if (dateRange.length === 0) return;
    const [start, end] = dateRange;
    const monthMap: Record<string, Data> = {};
    let current = end;
    while (
      current.month() > start.month() ||
      (current.month() === start.month() && current.date() >= start.date())
    ) {
      const month = current.month() + 1;
      if (!monthMap[month]) {
        monthMap[month] = {
          month: `${current.year()}年${month}月`,
          sum: "0",
          days: [],
        };
      }
      const days = monthMap[month].days;
      days.push({
        shop,
        time: dayjs(
          current.hour(17).minute(30).second(0).millisecond(0).valueOf() +
            Math.trunc(Math.random() * 2580000)
        ).format(`MM月DD日 HH:mm`),
        num: String((-(33 + Math.random() * 5)).toFixed(2)),
        isWeekend: current.day() === 0 || current.day() === 6,
      });
      days.push({
        shop,
        time: dayjs(
          current
            .hour(11)
            .minute(shop === Shop.Meituan ? 20 : 30)
            .second(0)
            .millisecond(0)
            .valueOf() + Math.trunc(Math.random() * 2580000)
        ).format(`MM月DD日 HH:mm`),
        num: String((-(33 + Math.random() * 5)).toFixed(2)),
        isWeekend: current.day() === 0 || current.day() === 6,
      });
      current = current.subtract(1, "day");
    }
    const data = Object.keys(monthMap)
      .sort((a, b) => Number(b) - Number(a))
      .map((k) => monthMap[k])
      .map((item) => {
        item.sum = Math.abs(
          item.days.reduce((sum, { num }) => sum + Number(num), 0)
        ).toFixed(2);
        return item;
      });
    setData(data);
  };
  const onDateChange = (dateRange: Dayjs[]) => {
    setDateRange(dateRange);
  };
  const toggleShop = () => {
    setShop(shop === Shop.Meituan ? Shop.QianHai : Shop.Meituan);
  };
  const filterDataItem = (i: number, j: number) => {
    const newData = data.map((item, ii) => {
      return ii === i
        ? {
            ...item,
            days: item.days.map((item, jj) => {
              return jj === j ? { ...item, disable: !item.disable } : item;
            }),
          }
        : item;
    });
    newData.forEach((item) => {
      item.sum = Math.abs(
        item.days.reduce(
          (sum, { num, disable }) => sum + (disable ? 0 : Number(num)),
          0
        )
      ).toFixed(2);
    });
    setData(newData);
  };
  return (
    <>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <img src={dataURL} />
      </Dialog>
      <DateRangePicker
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onChange={onDateChange}
      />
      <div
        className={`flex justify-center gap-x-8 h-screen overflow-hidden ${rubik.className}`}
      >
        <div className="w-[300px]">
          <h3>功能</h3>
          <div className="flex flex-col gap-y-4">
            <span>日期范围：</span>
            <span>
              {dateRange.length
                ? `${dateRange[0].format("YYYY-MM-DD")} ~ ${dateRange[1].format(
                    "YYYY-MM-DD"
                  )}`
                : ""}
            </span>
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              color="primary"
              variant="contained"
            >
              选择日期
            </Button>
            <Button onClick={toggleShop} color="secondary" variant="contained">
              前海/美团
            </Button>
            <Button onClick={generateData} color="primary" variant="contained">
              生成数据
            </Button>
            <Button onClick={preview} color="info" variant="contained">
              预览
            </Button>
            <Button onClick={createImage} color="success" variant="contained">
              生成图片
            </Button>
          </div>
        </div>
        <div>
          <div>
            <h3>编辑: {shop === Shop.Meituan ? "美团" : "前海大食堂"}</h3>
            <div className="w-[390px] h-[844px] overflow-y-auto pb-40">
              <div className="bg-[#efefef]">
                {data.map(({ month, sum, days }, i) => (
                  <div key={i}>
                    <div className="h-[60px] flex items-center justify-between px-[18px] border-0 border-y border-solid border-[#e5e5e5]">
                      <div className="flex items-center">
                        <span className="text-[#131313] text-base">
                          {month}
                        </span>
                        <KeyboardArrowDownIcon className="text-[#131313]" />
                      </div>
                      <span className="text-[#b9b9b9] text-[15px]">
                        支出￥
                        <input
                          value={sum}
                          onChange={(e) => {
                            setData(
                              data.map((item, ii) =>
                                ii === i
                                  ? { ...item, sum: e.target.value }
                                  : item
                              )
                            );
                          }}
                        />
                      </span>
                    </div>
                    {days.map(
                      (
                        {
                          time,
                          num,
                          refound,
                          originPrice,
                          shop,
                          isWeekend,
                          disable,
                        },
                        j
                      ) => (
                        <div
                          key={j}
                          className={`flex items-stretch h-[85px] pl-[18px] bg-white relative overflow-hidden ${
                            disable && "bg-[rgba(0,0,0,.5)]"
                          }`}
                        >
                          <div className="flex items-center">
                            {shop === Shop.Meituan ? (
                              <img
                                src="/img/meituan.jpg"
                                width={52}
                                height={52}
                                className="mx-0.5"
                              />
                            ) : (
                              <img
                                src="/img/qianhai.jpg"
                                width={52}
                                height={52}
                                className="mx-0.5"
                              />
                            )}
                          </div>
                          <div className="flex-1 flex flex-col justify-center ml-[18px] pr-[18px] border-0 border-b group-last:border-b-0 border-solid border-[#e4e4e4]">
                            <input
                              value={num}
                              onChange={(e) => {
                                setData(
                                  data.map((item, ii) =>
                                    ii === i
                                      ? {
                                          ...item,
                                          days: item.days.map((childItem, jj) =>
                                            jj === j
                                              ? {
                                                  ...childItem,
                                                  num: e.target.value,
                                                }
                                              : childItem
                                          ),
                                        }
                                      : item
                                  )
                                );
                              }}
                            />
                            <input
                              value={time}
                              onChange={(e) => {
                                setData(
                                  data.map((item, ii) =>
                                    ii === i
                                      ? {
                                          ...item,
                                          days: item.days.map((childItem, jj) =>
                                            jj === j
                                              ? {
                                                  ...childItem,
                                                  time: e.target.value,
                                                }
                                              : childItem
                                          ),
                                        }
                                      : item
                                  )
                                );
                              }}
                            />
                            <input
                              value={originPrice}
                              placeholder="原价"
                              onChange={(e) => {
                                setData(
                                  data.map((item, ii) =>
                                    ii === i
                                      ? {
                                          ...item,
                                          days: item.days.map((childItem, jj) =>
                                            jj === j
                                              ? {
                                                  ...childItem,
                                                  originPrice: e.target.value,
                                                }
                                              : childItem
                                          ),
                                        }
                                      : item
                                  )
                                );
                              }}
                            />
                          </div>
                          <div className="flex flex-col gap-y-1 justify-center">
                            <Button
                              variant="contained"
                              size="small"
                              className="rounded-full"
                              onClick={() => filterDataItem(i, j)}
                            >
                              {disable ? "启用" : "排除"}
                            </Button>
                          </div>
                          <div>
                            {isWeekend && (
                              <span className="text-red-500 absolute right-0 top-0 whitespace-nowrap">
                                周末
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>预览</h3>
          <div className="w-[390px] h-[844px] overflow-y-auto pb-40">
            <div className="bg-[#efefef]" ref={container}>
              {filteredData.map(({ month, sum, days }, i) => (
                <div key={i}>
                  <div className="h-[60px] flex items-center justify-between px-[18px] border-0 border-y border-solid border-[#e5e5e5]">
                    <div className="flex items-center">
                      <span className="text-[#131313] text-base">{month}</span>
                      <KeyboardArrowDownIcon className="text-[#131313]" />
                    </div>
                    <span className="text-[#b9b9b9] text-[15px]">
                      支出￥{sum}
                    </span>
                  </div>
                  {days.map(({ time, num, refound, originPrice, shop }, i) => (
                    <div
                      key={i}
                      className="flex items-stretch h-[85px] pl-[18px] bg-white group"
                    >
                      <div className="flex items-center">
                        {shop === Shop.Meituan ? (
                          <img
                            src="/img/meituan.jpg"
                            width={52}
                            height={52}
                            className="mx-0.5"
                          />
                        ) : (
                          <img
                            src="/img/qianhai.jpg"
                            width={52}
                            height={52}
                            className="mx-0.5"
                          />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-center ml-[18px] pr-[18px] border-0 border-b group-last:border-b-0 border-solid border-[#e4e4e4]">
                        <div className="flex items-center justify-between">
                          <span className={`text-[#1a1a1a] text-base`}>
                            {shop === Shop.Meituan
                              ? "美团平台商户"
                              : "前海大食堂"}
                          </span>
                          <span className="text-[#1a1a1a] text-base font-medium">
                            {num}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#b1b1b1] text-[15px] mt-1">
                            {time}
                          </span>
                          {refound ? (
                            <span className="text-[#ea5d5e] text-sm font-normal">
                              已全额退款
                            </span>
                          ) : originPrice ? (
                            <span className="text-[#b4b4b4] text-sm line-through font-thin">
                              {originPrice}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Money;
