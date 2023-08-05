import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useRef } from 'react';
function PieChart({ graphData, saleType }) {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);
    const [data, setData] = useState([
        { label: "Drink Sales", value: graphData?.drinksTotal, color: 'rgb(54, 162, 235)' },
        { label: "Food Sales", value: graphData?.foodTotal, color: 'rgb(243, 21, 89)' },
        { label: "Room Bookings", value: graphData?.roomsTotal, color: 'rgb(75, 192, 192)' },
        { label: "Expenses", value: graphData?.expenseTotal, color: 'rgb(255, 159, 64)' }

    ])
    useEffect(() => {
        let width = 0;
        let height = 0;
        let radius = 0;
        setWidth(ref?.current?.clientWidth)
    }, [ref])
    useEffect(() => {
        setData([
            { label: "Drink Sales", value: graphData?.drinksTotal, color: 'rgb(54, 162, 235)' },
            { label: "Food Sales", value: graphData?.foodTotal, color: 'rgb(243, 21, 89)' },
            { label: "Room Bookings", value: graphData?.roomsTotal, color: 'rgb(75, 192, 192)' },
            { label: "Expenses", value: graphData?.expenseTotal, color: 'rgb(255, 159, 64)' }

        ])
    }, [graphData])
    console.log(data)
    useEffect(() => {
        let width = 350;
        let height = 250;
        let radius =  Math.min(width, height) / 3;
       let div = document.getElementById(`pie-chart-${saleType}`)
       if(div){
        div.innerHTML = ""
       }
        
        function updateChart() {
            console.log("here" , ref)
            
            if (ref.current) {
                
                const div = ref.current;
                // width = div.clientWidth;
                // height = 0.7 * width;
                radius = Math.min(width, height) / 3;
            }
        }

        // Call the function once on initial render
        updateChart();

        // Add a listener for the 'resize' event
        window.addEventListener('resize', updateChart);




        const pie = d3.pie().sort(null).value(d => d.value);

        const arc = d3.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4);

        const outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        const svg = d3.select(`#pie-chart-${saleType}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.label))
            .range(data.map(d => d.color));

        function change(data) {
            const slice = svg.selectAll(".slice")
                .data(pie(data));

            slice.enter()
                .append("path")
                .attr("class", "slice")
                .merge(slice)
                .transition().duration(1000)
                .attr("d", arc)
                .style("fill", d => color(d.data.label));

            slice.exit().remove();

            const polyline = svg.selectAll(".lines")
                .data(pie(data))

            polyline.enter()
                .append("polyline")
                .attr("class", "lines")
                .merge(polyline)
                .transition().duration(1000)
                .style("fill", d => color(d.data.label))
                .attr("points", d => {
                    const posA = arc.centroid(d);
                    const posB = outerArc.centroid(d)
                    const midAngleVal = midAngle(d);
                    posB[0] = radius * 0.95 * (midAngleVal < Math.PI ? 1 : -1);
                    const posC = outerArc.centroid(d);
                    posC[0] = radius * 0.99 * (midAngleVal < Math.PI ? 1 : -1);
                    if (d.data.value == 0) {
                        return [0, 0, 0]
                    }
                    return [posA, posB, posC];
                });
            polyline.exit().remove();


        }

        const labels = svg.selectAll(".labels")
            .data(pie(data));

        labels.enter()
            .append("text")
            .attr("class", "labels")
            .attr("dy", "-.35em")
            .style("font-size", 9)
            .merge(labels)
            .transition().duration(1000)
            .attr("transform", d => {
                const pos = outerArc.centroid(d);
                const midAngleVal = midAngle(d);
                pos[0] = radius * 0.95 * (midAngleVal < Math.PI ? 1.05 : -1.05);

                // Check if there's an overlap with other labels
                labels.each(function (otherLabelData) {
                    if (otherLabelData !== d) {
                        const otherPos = outerArc.centroid(otherLabelData);
                        const distance = Math.sqrt((otherPos[0] - pos[0]) ** 2 + (otherPos[1] - pos[1]) ** 2);
                        if (distance < 20) { // Adjust this value to control the distance between labels
                            if (midAngleVal < Math.PI) {
                                pos[1] -= 8; // Move the label up
                            } else {
                                pos[1] += 8; // Move the label down
                            }
                        }
                    }
                });

                return `translate(${pos})`;
            })
            .style("text-anchor", d => (midAngle(d) < Math.PI ? "start" : "end"))
            .text(d => { if (d.data.value == 0) { return "" } else { return d.data.label + " : " + (d.data.value / data.reduce((a, b) => a + b.value, 0) * 100).toFixed(2) + "%" } })
        labels.enter()
            .append("text")
            .attr("class", "labels")
            .attr("dy", "-1.35em")
            .style("font-size", 9)
            .merge(labels)
            .transition().duration(1000)
            .attr("transform", d => {
                const pos = outerArc.centroid(d);
                const midAngleVal = midAngle(d);
                pos[0] = radius * 0.95 * (midAngleVal < Math.PI ? 1.05 : -1.05);

                // Check if there's an overlap with other labels
                labels.each(function (otherLabelData) {
                    if (otherLabelData !== d) {
                        const otherPos = outerArc.centroid(otherLabelData);
                        const distance = Math.sqrt((otherPos[0] - pos[0]) ** 2 + (otherPos[1] - pos[1]) ** 2);
                        if (distance < 20) { // Adjust this value to control the distance between labels
                            if (midAngleVal < Math.PI) {
                                pos[1] -= 8; // Move the label up
                            } else {
                                pos[1] += 8; // Move the label down
                            }
                        }
                    }
                });

                return `translate(${pos})`;
            })
            .style("text-anchor", d => (midAngle(d) < Math.PI ? "start" : "end"))
            .text(d => { if (d.data.value == 0) { return "" } else { return d.data.value?.toLocaleString(undefined, { useGrouping: true }) + " UGX" } })

        // labels.enter()
        //     .append("text")
        //     .attr("class", "labels")
        //     .attr("dy", "-2.35em")
        //     .style("font-size", 9)
        //     .merge(labels)
        //     .transition().duration(1000)
        //     .attr("transform", d => {
        //         const pos = outerArc.centroid(d);
        //         const midAngleVal = midAngle(d);
        //         pos[0] = radius * 0.95 * (midAngleVal < Math.PI ? 1.05 : -1.05);

        //         // Check if there's an overlap with other labels
        //         labels.each(function (otherLabelData) {
        //             if (otherLabelData !== d) {
        //                 const otherPos = outerArc.centroid(otherLabelData);
        //                 const distance = Math.sqrt((otherPos[0] - pos[0]) ** 2 + (otherPos[1] - pos[1]) ** 2);
        //                 if (distance < 20) { // Adjust this value to control the distance between labels
        //                     if (midAngleVal < Math.PI) {
        //                         pos[1] -= 8; // Move the label up
        //                     } else {
        //                         pos[1] += 8; // Move the label down
        //                     }
        //                 }
        //             }
        //         });

        //         return `translate(${pos})`;
        //     })
        //     .style("text-anchor", d => (midAngle(d) < Math.PI ? "start" : "end"))
        //     .text(d => { if (d.data.value == 0) { return "" } else { return (d.data.value / data.reduce((a, b) => a + b.value, 0) * 100).toFixed(2) + "%" } })

        labels.exit().remove();

        function midAngle(d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        change(data);
    }
        , [data , width]);

    return (
        <>
            {!(graphData?.drinksTotal === 0 && graphData?.foodTotal === 0 && graphData?.roomsTotal === 0 && graphData?.expenseTotal === 0) ?
                <div ref={ref} id={`pie-chart-${saleType}`}></div> : <div className='w-full h-full flex items-center justify-center' >No Data Found</div>}
        </>
    );
}

export default PieChart;
