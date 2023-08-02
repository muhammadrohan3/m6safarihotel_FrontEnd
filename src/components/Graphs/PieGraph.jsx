import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

function PieGraph({ data, salesType }) {
    Chart.register(ChartDataLabels)
    return (
        <div className='w-full '>
            
            { data.drinksTotal === 0 && data.foodTotal === 0 && data.roomsTotal === 0 && data.expenseTotal === 0 ? 
            <div className='w-full flex justify-center items-center text-gray-400 h-48'>No Data Yet</div>
            : <Pie
                data={
                    {
                        labels: ['Drinks', 'Food', 'Rooms', 'Expenses'],
                        datasets: [{
                            label: salesType,
                            data: [data.drinksTotal, data.foodTotal, data.roomsTotal, data.expenseTotal],
                            backgroundColor: ['rgb(54, 162, 235)', 'rgb(243, 21, 89)', 'rgb(75, 192, 192)' , 'rgb(255, 159, 64)' , 'rgb(255, 159, 64)' , 'rgb(255, 205, 86)' , 'rgb(201, 203, 207)'],
                        }],

                    }
                }
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                          color: '#000', // Set the color of the data labels
                          anchor: 'end',
                          align: 'start',
                          offset: 20,
                          formatter: (value, context) => {
                            if(value){
                                return context.chart.data.labels[context.dataIndex] + ' : ' + Number(value).toLocaleString({useGrouping : true});
                            }
                              
                          }
                        }
                      }
                  }}

            />}
        </div>
    )
}

export default PieGraph