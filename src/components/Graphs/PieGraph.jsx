import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

function PieGraph({ data, salesType }) {
    Chart.register(ChartDataLabels)
    
    return (
        <div className='w-full '>

            {data.drinksTotal === 0 && data.foodTotal === 0 && data.roomsTotal === 0 && data.expenseTotal === 0 ?
                <div className='w-full flex justify-center items-center text-gray-400 h-48'>No Data Yet</div>
                : <Pie
                    data={
                        {
                            labels: ['Drinks', 'Food', 'Rooms', 'Expenses'],
                            datasets: [{
                                label: salesType,
                                datalabels: {
                                    anchor: 'center',
                                    align: 'end',
                                },
                                data: [data.drinksTotal, data.foodTotal, data.roomsTotal, data.expenseTotal],
                                backgroundColor: ['rgb(54, 162, 235)', 'rgb(243, 21, 89)', 'rgb(75, 192, 192)', 'rgb(255, 159, 64)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(201, 203, 207)'],
                            }],

                        }
                    }
                    height={400}
                    width={600}
                    options={{
                        layout: {
                            padding: 10,
                        },
                        maintainAspectRatio: false,
                        responsive: true,
                        datasets: {
                            pie: {
                                borderWidth: 0,
                                borderColor: 'white',
                                backgroundColor : "black"
                            }
                        }, pieceLabel: {
                            mode: 'value',
                            position: 'outside',
                            fontColor: '#000',
                            format: function (value) {
                                return '$' + value;
                            }
                        },
                        
                        plugins: {
                            
                            datalabels: {
                                font: {
                                    size: 14,
                                },                                
                                offset: 30, 
                                position: 'outside',
                                // Adjust the distance of the labels from the chart
                                textAlign: 'center',
                                anchor: 'start',
                                clamp: 'end', // Prevent labels from overflowing outside the chart                        
                                color: 'black',
                                formatter: (value, context) => {
                                    if (value) {
                                        return Number(value).toLocaleString({ useGrouping: true }) + " UGX";
                                    }

                                }
                            },
                            
                        }
                    }}
                    plugins={[ChartDataLabels]}

                />}
        </div>
    )
}

export default PieGraph