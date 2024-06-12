import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function MainPage() {
  const [searchTrip, setSearchTrip] = useState("");
  const [tripsData, setTripsData] = useState([]);
  //ดึงข้อมูลจาก api ให้มา render บน website โดยการrender จะเปลี่ยนเมื่อมีการพิมพ์หรือช่องค้นหาการการเปลี่ยนแปลง
  const getTravelTrips = async () => {
    const respond = await axios.get(
      `http://localhost:4001/trips?keywords=${searchTrip}`
    );
    console.log(respond.data.data);
    setTripsData(respond.data.data);
  };

  useEffect(() => {
    getTravelTrips();
  }, [searchTrip]);

  const textLimit100 = (text) => {
    if (text.length > 100) {
      text = text.substr(0, 100) + `...`;
    }
    return text;
  };

  //ใช้ navigator ช่วยในการ copy
  const copyClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("คัดลอกลิงก์เรียบร้อยแล้ว");
    } catch (error) {
      console.error("ไม่สามารถคัดลอกลิงก์ได้: ", error);
    }
  };

  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold text-sky-500 text-center">
        เที่ยวไหนดี
      </h1>
      <div className="pt-10 pl-20 pb-10">
        <label htmlFor="searchTravel">ค้นหาที่เที่ยว</label>
        <input
          id="searchTravel"
          type="text"
          name="searchTravel"
          placeholder="หาที่เที่ยวแล้วไปกัน"
          className="border-b-slate-300 border-b-2 block text-center w-full"
          value={searchTrip}
          onChange={(event) => {
            setSearchTrip(event.target.value);
          }}
        />
      </div>
      <section className=" flex-col bg-slate-500 ">
        {tripsData.map((item) => {
          return (
            <div
              className="grid-cols-1 pb-5 flex justify-center "
              key={item.uid}
            >
              <div className="flex gap-5 bg-white container">
                <img
                  className="rounded-3xl bg-slate-50 container w-96 h-48 object-cover m-4"
                  src={item.photos[0]}
                  alt="some product"
                  key={item.img}
                ></img>
                <div>
                  <button
                    onClick={() => {
                      const newWindow = window.open(item.url, "_blank");
                      if (newWindow) newWindow.focus();
                    }}
                  >
                    <p className="text-xl font-semibold">{item.title}</p>
                  </button>
                  <p className="text-ellipsis overflow: hidden;">
                    {textLimit100(item.description)}
                  </p>
                  <button
                    className="underline text-blue-500 "
                    onClick={() => {
                      // search เพิ่มเติมเรื่อง link browser ภายนอก
                      const newWindow = window.open(item.url, "_blank"); //เปิดtab ใหม่
                      if (newWindow) newWindow.focus(); //ถ้าไม่ใช่ null user จะย้ายไปfocus browser แถบใหม่แทน
                    }}
                  >
                    อ่านต่อ
                  </button>
                  <div className="flex gap-2 ">
                    <p>หมวด</p>
                    {item.tags.map((tag) => {
                      return (
                        <button
                          key={tag}
                          className="underline text-slate-600"
                          onClick={() => {
                            const newSearchTrip = searchTrip
                              ? `${searchTrip} ${tag}`
                              : tag;
                            setSearchTrip(newSearchTrip);
                          }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                  <div>
                    {item.photos.map((photos, index) => {
                      if (index !== 0) {
                        return (
                          <img
                            className="rounded-3xl bg-slate-50 inline p-1"
                            src={photos}
                            alt="some product"
                            width="150"
                            height="200"
                            key={index}
                          ></img>
                        );
                      }
                    })}
                    <button
                      className=" bg-blue-500 text-white px-2 w-20 h-20 rounded-full flex-row ml-5"
                      onClick={() => copyClipboard(item.url)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default MainPage;
