
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

// const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  // const coinPrices = coinPrice.reverse();
  // const coinTimestamps = coinTimestamp.reverse();

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(moment.unix(coinHistory?.data?.history[i].timestamp).format('DD-MM-YYYY'));
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        position: 'right',
          ticks: {            
            beginAtZero: true,
          },
        },
      x: {
        reverse: true,
      }
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Typography level={2} className="chart-title">{coinName} Price Chart </Typography>
        <Col className="price-container">
          <Typography level={5} className="price-change">Change: {coinHistory?.data?.change}%</Typography>
          <Typography level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Typography>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
