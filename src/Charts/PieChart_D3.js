import React, { useEffect, useState, useRef } from 'react';
import { Chart } from "chart.js/auto";
import axios from "axios";
import '../index.scss';
import * as d3 from 'd3';



function PieChart() {
    const [, setBudgetData] = useState([]);
    const [isSecondChartCreated, setIsSecondChartCreated] = useState(false);
    const secondChartRef = useRef(null);
  
    useEffect(() => {
      axios.get('http://localhost:3000/budget')
        .then((res) => {
          setBudgetData(res.data.myBudget);
          createChart(res.data.myBudget);
  
          if (!isSecondChartCreated) {
            createSecondChart(res.data.myBudget);
            setIsSecondChartCreated(true);
          }
        })
        .catch((error) => {
          console.error('Error fetching budget data:', error);
        });
    }, [isSecondChartCreated]);
  
    function createChart(data) {
      const ctx = document.getElementById("myChart").getContext("2d");
  
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }
  
      const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.map(item => item.title),
          datasets: [{
            data: data.map(item => item.budget),
            backgroundColor: [
                '#ffcd56','#ff6384','#36a2eb','#fd6b19', '#f38b4a', '#56d798', '#ff8397','#6970d5','#eb3639'
              // Add more colors if needed
            ],
          }],
        },
      });
    }
  
    function createSecondChart(data) {
      const width = 700;
      const height = 500;
      const radius = Math.min(width, height) / 2;
  
      if (secondChartRef.current) {
        d3.select(secondChartRef.current).selectAll('*').remove();
      }
  
      const svg = d3.select(secondChartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
  
      const color = d3.scaleOrdinal()
        .domain(data.map(d => d.title))
        .range([ '#ffcd56','#ff6384','#36a2eb','#fd6b19', '#f38b4a', '#56d798', '#ffcd56','#6970d5','#eb3639']);
  
      const pie = d3.pie()
        .sort(null)
        .value(d => d.budget);
  
      const arc = d3.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.4);
  
      const outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);
  
      const arcs = svg.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");
  
      arcs.append("path")
        .attr("d", arc)
        .style("fill", d => color(d.data.title))
        .attr("class", "slice");
  
      const text = svg.selectAll(".labels")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function (d) {
          return d.data.title;
        });
  
      function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }
  
      text.transition().duration(1000)
        .attr("transform", function (d) {
          var pos = outerArc.centroid(d);
          pos[0] = radius * 1.002 * (midAngle(d) < Math.PI ? 1 : -1);
          return "translate(" + pos + ")";
        })
        .style("text-anchor", function (d) {
          return midAngle(d) < Math.PI ? "start" : "end";
        });
  
      const polyline = svg.selectAll(".lines")
        .data(pie(data))
        .enter()
        .append("polyline");
  
      polyline.transition().duration(1000)
        .attr("points", function (d) {
          var pos = outerArc.centroid(d);
          pos[0] = radius * 1 * (midAngle(d) < Math.PI ? 1 : -1);
          return [arc.centroid(d), outerArc.centroid(d), pos];
        });
    }
  
   
       return(
        <div className="graphs_container">
        <canvas id="myChart" width="400" height="400"></canvas>

        <div ref={secondChartRef}></div>
        </div>
  
    );
}
export default PieChart