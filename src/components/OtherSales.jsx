import React, { useEffect, useState } from "react";
import Table from "./Table";
import AddExpenses from "./AddExpenses";
import AddOtherSales from "./AddOtherSales";
import axios from "../utils/axios";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
function OtherSales() {
  const { user } = useSelector((state) => state.auth);
  const [otherSales, setOtherSales] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    if (!addOpen) {
      setData({});
    }

    axios
      .get("/sales/getOtherSales")
      .then((res) => {
        setOtherSales(res.data.sales);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [addOpen]);
  return (
    <>
      <NavBar></NavBar>
      <div className="flex w-full justify-center py-10">
        {addOpen && <AddOtherSales setAddOpen={setAddOpen} salesData={data} />}
        <div className="max-w-[900px] w-[90%] flex flex-col items-center gap-4">
          <div className="w-full flex p-4 bg-slate-50 justify-between rounded-lg items-center shadow-md text-sm md:text-lg">
            <h1 className="text-gray-500 ">OtherSales</h1>
            {(user?.role == "Super Admin" || user?.role == "Admin") && (
              <button
                className="px-2 h-8 border rounded-full bg-green-400 text-white hover:bg-white hover:text-green-400 border-green-400 text-sm"
                onClick={setAddOpen}
              >
                + Add OtherSales
              </button>
            )}
          </div>
          <Table
            header={["Description", "Date", "Amount", "Entry By"]}
            body={otherSales?.map((sale) => {
              return {
                ...sale,
                Description: sale.details,
                Date: sale.date.split("T")[0],
                Amount: sale.amount,
                "Entry By": sale?.addedBy?.fullName,
              };
            })}
            actionText={"Edit"}
            setAddOpen={setAddOpen}
            setData={setData}
          />
        </div>
      </div>
    </>
  );
}

export default OtherSales;
