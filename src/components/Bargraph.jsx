import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";
import axios from '../utils/axios'
function Bargraph({ data, salesType }) {
    const [dataArray, setDataArray] = useState()

    useEffect(() => {
        if (Array.isArray(data)) { // Check if data is an array
            console.log(data);
            const backgroundColor =  ['rgb(54, 162, 235)', 'rgb(243, 21, 89)', 'rgb(75, 192, 192)' , 'rgb(255, 99, 132)' , 'rgb(255, 159, 64)' , 'rgb(255, 205, 86)' , 'rgb(201, 203, 207)']
            const data1 = {
              labels: ['Drinks', 'Food', 'Rooms'],
              datasets: data.map((item , index) => ({
                label: `Week ${index+1}`,
                data: [item.drinksTotal, item.foodTotal, item.roomsTotal],
                backgroundColor: backgroundColor[index],
              })),
            };
          
            setDataArray(data1);
          }
        else{
            const data2 = {
                labels: ['Food', 'Drinks', 'Rooms'],
                datasets: [{
                    label: salesType,
                    data: [data.drinksTotal, data.foodTotal, data.roomsTotal],
                    backgroundColor: ['rgb(54, 162, 235)', 'rgb(243, 21, 89)', 'rgb(75, 192, 192)'],
                }],
            }
            setDataArray(data2)
        }
    }, [data])
    const data1 = [data?.drinksTotal, data?.foodTotal, data?.roomsTotal]
    const max = Math.max(...data1) + 500
    console.log(max)
    return (
        <div className='w-full'>
            {dataArray && <Bar
                data={dataArray}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: max,
                        },
                    },
                }}
            />}
        </div>
    )
}

export default Bargraph