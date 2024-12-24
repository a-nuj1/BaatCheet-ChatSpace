import React from 'react'
import {Line, Doughnut} from 'react-chartjs-2'
import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, plugins, PointElement, Tooltip} from 'chart.js'
import { orange, purple, purpleLight } from '../../constants/colors';
import { getLast7Days } from '../../lib/features';


ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    Tooltip, Filler, ArcElement, Legend
)

const LineOptions = {
    responsive: true,
    plugins:{
        legend: {
            display: false
        },
        title: {
            display: true,
            // text: 'Line Chart'
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false
            },
        }
    },

};

const labels = getLast7Days();

function LineChart({value = []}) {
    const data = {
        labels,
        datasets: [{
            data: value,
            label: 'Messages',
            fill: true,
            borderColor: purple,
            backgroundColor: purpleLight,
        },

    ]

    }
  return (
    <Line data={data} options={LineOptions}></Line>
  )
}

const DoughnutOptions = {
    responsive: true,
    plugins:{
        legend: {
            display: false
        },
        title: {
            display: true,
            // text: 'Doughnut Chart'
        }
    },
    cutout: '100',

};


function DoughnutChart({value = [], labels = []}) {
    const data = {
        labels: ['Group', 'Individual'],
        datasets: [{
            data: value,
            offset: 30,
            borderColor: [purpleLight, orange],
            backgroundColor: [purpleLight, '#89d9ad'],
            hoverBackgroundColor: [purple, '#09803e'],
        }]
    }
  return (
    <Doughnut style={{zIndex:10}}  data = {data} options={DoughnutOptions}/>
  )
}

export {LineChart, DoughnutChart}