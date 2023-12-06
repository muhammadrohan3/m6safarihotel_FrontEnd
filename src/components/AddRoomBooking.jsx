import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import Message from "./Message";
import { numberWithCommas } from "../utils/helperFunctions";
import { imageUpload } from "../utils/cloudinaryconfig";

function AddRoomBooking({ setAddOpen, bookingData }) {
  console.log("booking data", bookingData)
  const { user } = useSelector((state) => state.auth);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [seletedRooms, setSelectedRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [room, setRoom] = useState({
    room: "",
    total: 0,
    customerName: "",
    customerId: "",
    checkIn: "",
    checkOut: "",
    addedBy: user?._id,
  });
  useEffect(() => {
    if (bookingData._id) {
      setRoom({
        room: bookingData.room?._id,
        total: bookingData.total,
        customerName: bookingData.customerName,
        customerId: bookingData.customerId,
        checkIn: bookingData.checkIn.split("T")[0],
        checkOut: bookingData.checkOut.split("T")[0],
        roomType: bookingData.room?.roomType,
        addedBy: bookingData.addedBy?._id,
        _id: bookingData._id,
      });
    }
  }, [bookingData]);
  useEffect(() => {}, [room, seletedRooms, availableRooms]);
  const [message, setMessage] = useState({ text: "", type: "" });
  useEffect(() => {
    if (room.checkIn === "" || room.checkOut === "") {
      return;
    } else if (new Date(room.checkIn) > new Date(room.checkOut)) {
      setMessage({
        text: "Check Out date cannot be before Check In date",
        type: "error",
      });
      return;
    }
    axios
      .post(`/rooms/getAvailableRooms?${"notinclude=" + bookingData._id}`, {
        checkIn: room.checkIn,
        checkOut: room.checkOut,
      })
      .then((res) => {
        setAvailableRooms(res.data);
        let types = [];
        res.data.forEach((room) => {
          if (!types.includes(room.roomType)) {
            types.push(room.roomType);
          }
        });
        setRoomTypes(types);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [room.checkIn, room.checkOut]);
  useEffect(() => {
    if (room.roomType === "") {
      return;
    }
    let rooms = availableRooms.filter((room1) => {
      return room.roomType == room1.roomType;
    });
    setSelectedRooms(rooms);
  }, [room.roomType]);
  const handleDateChange = (e) => {
    console.log(e.target.value);
    setAvailableRooms([]);
    if (e.target.name === "checkIn") {
      setRoom({
        ...room,
        checkIn: e.target.value,
      });
    } else if (
      e.target.name === "checkOut" &&
      new Date(room.checkIn) < new Date(e.target.value)
    ) {
      setRoom({
        ...room,
        checkOut: e.target.value,
      });
    }
    if (new Date(room.checkIn) > new Date(room.checkOut)) {
      setMessage({
        text: "Check Out date cannot be before Check In date",
        type: "error",
      });
      return;
    }
  };
  useEffect(() => {
    if(room.room.length > 0){
      console.log("here")
      setRoom({
        ...room,
        total:
          getDays() *
          seletedRooms?.find((room1) => room1?._id == room.room)?.roomPrice,
      });
    }
    
  }, [room.checkIn, room.checkOut]);
  const handleIdChange = (e) => {
    imageUpload(e.target.files)
      .then((res) => {
        setRoom({ ...room, customerId: res[0].url });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = () => {
    if (room.room === "") {
      setMessage({ text: "Please Enter the room", type: "error" });
      return;
    }
    if (room.total == 0 || room.total < 0) {
      setMessage({ text: "Please Enter the Added By", type: "error" });
    }
    if (room.checkIn === "") {
      setMessage({ text: "Please Enter the Check in Date", type: "error" });
      return;
    }
    if (room.checkOut === "") {
      setMessage({ text: "Please Enter the Check out Date", type: "error" });
      return;
    }
    if (room.customerName === "") {
      setMessage({ text: "Please Enter the Customer Name", type: "error" });
      return;
    }
    // if (room.customerId === "") {
    //   setMessage({ text: "Please Enter the Customer Id", type: "error" });
    //   return;
    // }

    axios
      .post("/rooms/addRoomBooking", {
        ...room,
        total: room.total.toString().replace(",", ""),
      })
      .then((res) => {
        setMessage({ text: res.data.msg, type: "success" });
        setRoom({
          room: "",
          total: 0,
          customerName: "",
          customerId: "",
          checkIn: "",
          checkOut: "",
          addedBy: user?._id,
        });
        setAddOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage({ text: err.response.data.msg, type: "error" });
      });
  };
  const handleUpdate = () => {
    axios
      .put(`/rooms/updateBooking/${room._id}`, {
        ...room,
        total: room.total.toString().replace(",", ""),
      })
      .then((res) => {
        setMessage({ text: res.data.msg, type: "success" });
        setRoom({
          room: "",
          total: 0,
          customerName: "",
          customerId: "",
          checkIn: "",
          checkOut: "",
          addedBy: user?._id,
        });
        setAddOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage({ text: err.response.data.msg, type: "error" });
      });
  };
  const handleDelete = () => {
    axios
      .delete(`/rooms/deleteBooking/${room._id}`)
      .then((res) => {
        setMessage({ text: res.data.msg, type: "success" });
        setRoom({
          room: "",
          total: 0,
          customerName: "",
          customerId: "",
          checkIn: "",
          checkOut: "",
          addedBy: user?._id,
        });
        setAddOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage({ text: err.response.data.msg, type: "error" });
      });
  };
  useEffect(() => {}, [message]);
  const getDays = () => {
    let days =
      (new Date(room?.checkOut) - new Date(room?.checkIn)) /
      (1000 * 60 * 60 * 24);
    return days;
  };
  return (
    <div
      className="w-full absolute top-0 left-0 flex justify-center z-10 items-center overflow-y-scroll text-gray-600 py-10 "
      onClick={(e) => {
        e.stopPropagation();
        setAddOpen(false);
      }}
    >
      <div
        className="relative max-w-[800px] w-[90%] border rounded-lg flex flex-col p-10 gap-4 bg-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-red-500 absolute right-[10px] top-[10px] cursor-pointer"
          onClick={() => setAddOpen(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-center text-xl">Book Room</h1>
        {message?.text?.length > 0 && (
          <Message
            type={message.type}
            text={message.text}
            setMessage={setMessage}
          />
        )}
        <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="w-full">
            <label htmlFor="">Check In Date </label>
            <input
              type="date"
              name={"checkIn"}
              className="border w-full rounded-lg px-2 h-9 mt-3"
              placeholder="Enter Room Name here"
              onChange={(e) => {
                handleDateChange(e);
              }}
              value={room?.checkIn}
            />
          </div>
          <div className="w-full">
            <label htmlFor="">Checkout Date</label>
            <input
              type="date"
              name={"checkOut"}
              className="border w-full rounded-lg px-2 h-9 mt-3"
              placeholder="Enter Room Number here"
              onChange={(e) => {
                handleDateChange(e);
              }}
              value={room?.checkOut}
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Room Type</label>
          <select
            name="roomType"
            id=""
            className="border w-full rounded-lg px-2 h-9 mt-3"
            onChange={(e) => setRoom({ ...room, roomType: e.target.value })}
            value={room?.roomType}
          >
            <option value="">Select Room Type</option>
            {roomTypes.map((roomType) => {
              return <option value={roomType}>{roomType}</option>;
            })}
          </select>
        </div>
        <div>
          <label htmlFor="">Available Rooms</label>
          <select
            name="roomType"
            id=""
            className="border w-full rounded-lg px-2 h-9 mt-3"
            onChange={(e) =>
              setRoom({
                ...room,
                room: e.target.value,
                total:
                  getDays() *
                  seletedRooms?.find((room1) => room1?._id == e.target.value)
                    ?.roomPrice,
              })
            }
            value={room.room}
          >
            <option value="">Select The Room</option>
            {availableRooms?.map((room1) => {
              if (room1.roomType == room.roomType) {
                return (
                  <option value={room1._id}>
                    {room1.roomNumber} - {room1.roomName}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="w-full">
            <label htmlFor="">Room Price</label>
            <input
              type="text"
              className="border w-full rounded-lg px-2 h-9 mt-3"
              placeholder="Enter Room Price here"
              onChange={(e) => {
                setRoom({ ...room, roomPrice: e.target.value });
              }}
              value={numberWithCommas(
                availableRooms?.find((room1) => room1?._id == room.room)
                  ?.roomPrice
              )}
              disabled
            />
          </div>
          <div className="w-full">
            <label htmlFor="">Total Bill</label>
            <input
              type="text"
              className="border w-full rounded-lg px-2 h-9 mt-3"
              placeholder="Enter Amount here"
              onChange={(e) => {
                setRoom({ ...room, total: e.target.value });
              }}
              value={numberWithCommas(room.total)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Customer Name</label>
          <input
            type="text"
            className="border w-full rounded-lg px-2 h-9 mt-3"
            placeholder="Enter Customer Name Here"
            onChange={(e) => {
              setRoom({ ...room, customerName: e.target.value });
            }}
            value={room.customerName}
          />
        </div>
        <div>
          <label htmlFor="">Customer Id</label>
          {room.customerId ? (
            <div className="w-64 relative my-5 border border-slate-300 rounded-lg">
              <svg
                onClick={() => {
                  setRoom({ ...room, customerId: null });
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-red-600 absolute top-[-10px] right-[-10px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <img
                src={
                  typeof room.customerId === "string"
                    ? room.customerId
                    : URL.createObjectURL(room.customerId)
                }
                alt=""
                className="w-72 rounded-lg"
              />
            </div>
          ) : (
            <input
              type="file"
              className="border w-full rounded-lg px-2 h-9 mt-3"
              placeholder="Enter Customer Id"
              onChange={(e) => {
                handleIdChange(e);
              }}
            />
          )}
        </div>

        {room._id ? (
          <div className="w-full flex justify-center pt-10 gap-4">
            <button
              className="px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 "
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="px-2 h-9 border rounded-full bg-red-400 text-white hover:bg-white hover:text-red-400 border-red-400 "
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-center pt-10">
            <button
              className="px-2 h-9 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 "
              onClick={handleSubmit}
            >
              Book Rooom
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddRoomBooking;
