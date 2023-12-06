import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";
function Bargraph({ data, salesType }) {
    const [dataArray, setDataArray] = useState()

    useEffect(() => {
        if (Array.isArray(data)) { // Check if data is an array
            
            const backgroundColor = [ 'rgb(243, 21, 89)','rgb(54, 162, 235)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(0,63,92)', 'rgb(255, 205, 86)', 'rgb(201, 203, 207)']
            const data1 = {
                labels: ['Drinks', 'Food', 'Rooms', 'Other Sales'],
                datasets: data.map((item, index) => ({
                    label: `Week ${index + 1}`,
                    data: [item.drinksTotal, item.foodTotal, item.roomsTotal, item.otherSalesTotal],
                    backgroundColor: backgroundColor[index],
                })),
            };

            setDataArray(data1);
        }
        else {
            const data2 = {
                labels: ['Drinks','Food',  'Rooms', 'Expenses', 'Other Sales'],
                datasets: [{
                    label: salesType,
                    maxBarThickness: 35,
                    data: [data.drinksTotal, data.foodTotal, data.roomsTotal, data.expenseTotal, data.otherSalesTotal],
                    backgroundColor: [  'rgb(54, 162, 235)', 'rgb(243, 21, 89)','rgb(75, 192, 192)', 'rgb(255, 159, 64)', 'rgb(0,63,92)'],
                }],
            }
            setDataArray(data2)
        }
    }, [data])
    const data1 = [data?.drinksTotal, data?.foodTotal, data?.roomsTotal]
    const max = Math.max(...data1) + 500
    
    return (
        <div className='max-w-[750px] w-[90%]'>
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
                    
                    
                    plugins: {
                        datalabels: {
                            display: false
                        },
                        legend:{
                            display: false
                        }
                        // legend: {
                        //     labels: {
                        //         boxWidth: 30,
                        //         boxHeight: 10,
                                
                                
                        //          // Adjust the width of the colored boxes in the legend
                        //         generateLabels: (chart)=>([{
                        //             text: `Food`, // Custom label content
                        //             fillStyle: 'rgb(54, 162, 235)',
                        //             hidden: false,
                        //             index: 0,
                        //         } , {
                        //             text: `Drinks`, // Custom label content
                        //             fillStyle: 'rgb(243, 21, 89)',
                        //             hidden: false,
                        //             index: 0,
                        //         },{
                        //             text: `Room Booking`, // Custom label content
                        //             fillStyle: 'rgb(75, 192, 192)',
                        //             hidden: false,
                        //             index: 0,
                        //         },{
                        //             text: `Expenses`, // Custom label content
                        //             fillStyle: 'rgb(255, 159, 64)',
                        //             hidden: false,
                        //             index: 0,
                        //         }]),
                        //     },
                        // }
                    }
                }}
            />}
        </div>
    )
}

export default Bargraph