import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function MainPage() {
  const [searchTrip, setSearchTrip] = useState("");
  const [tripsData, setTripsData] = useState([]);
  const getTravelTrips = async () => {
    const respond = await axios.get(
      /*  `https://teawnaidee-techup.up.railway.app/trips?keywords=${searchTrip}` */
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
    <div className="m-10 w-fit ">
      <h1 id="font-1" className="text-6xl font-bold text-sky-500 text-center">
        เที่ยวไหนดี
      </h1>
      <div className="pt-10 pb-10 flex-col text-xl">
        <label htmlFor="searchTravel">ค้นหาที่เที่ยว</label>
        <input
          id="searchTravel"
          type="text"
          name="searchTravel"
          placeholder="หาที่เที่ยวแล้วไปกัน"
          className="border-b-slate-300 border-b-2 block text-center  w-full "
          value={searchTrip}
          onChange={(event) => {
            setSearchTrip(event.target.value);
          }}
        />
      </div>
      <section className=" flex-col md:columns-2 max-md:columns-1 ">
        {tripsData.map((item) => {
          return (
            <div
              className="grid-cols-1 pb-5 flex justify-center  "
              key={item.uid}
            >
              <div className="flex gap-5 bg-white container max-md:flex-col">
                <img
                  className="rounded-3xl  container w-96 h-48 object-cover m-4 "
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
                    <p id="title" className="text-xl font-semibold">
                      {item.title}
                    </p>
                  </button>
                  <p className="text-ellipsis overflow: hidden;">
                    {textLimit100(item.description)}
                  </p>
                  <button
                    className="underline text-blue-500 "
                    onClick={() => {
                      const newWindow = window.open(item.url, "_blank");
                      if (newWindow) newWindow.focus();
                    }}
                  >
                    อ่านต่อ
                  </button>
                  <div className="flex gap-2 ">
                    <p className="text-slate-500 font-medium">หมวด</p>
                    {item.tags.map((tag) => {
                      return (
                        <button
                          id="tag"
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
                      id="copyBtn"
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
