'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, UTCTimestamp, IChartApi, ISeriesApi } from 'lightweight-charts';
import { useSize } from 'ahooks';
import { show_all_icp_transaction_logs } from '@/actor/meme_icrc2';
import { Box, CircularProgress } from '@mui/material';

interface ChartDataProps {
  time: UTCTimestamp;
  value: number;
}

export const ItemMainContent = (props: { canister: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Area'> | null>(null);
  const size = useSize(containerRef);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ChartDataProps[]>([]);

  const fetchData = useCallback(async () => {
    const res = await show_all_icp_transaction_logs(props.canister);
    const extractedData = res
      .map((item) => ({
        time: (Number(item.timestamp) / 1000) as UTCTimestamp,
        value: Number(item.usdt_amount) / 10 ** 8,
      }))
      .sort((a, b) => a.time - b.time);

    setData(extractedData);
    setLoading(false);
  }, [props.canister]);

  const initChart = useCallback(() => {
    if (containerRef.current && size) {
      const chart = createChart(containerRef.current, {
        width: size.width,
        height: size.width * 0.5,
        layout: {
          background: { type: 'solid' as any, color: '#222' },
          textColor: '#DDD',
        },
        grid: {
          vertLines: { color: '#444' },
          horzLines: { color: '#444' },
        },
        rightPriceScale: {
          autoScale: false,
          scaleMargins: {
            top: 0.1,
            bottom: 0,
          },
          borderColor: '#444',
        },
        timeScale: {
          borderColor: '#444',
          timeVisible: true,
          secondsVisible: false,
          tickMarkFormatter: (time: UTCTimestamp) => {
            const date = new Date(time * 1000);
            return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
          },
        },
      });

      const series = chart.addAreaSeries({
        lineColor: '#2962FF',
        topColor: 'rgba(41, 98, 255, 0.3)',
        bottomColor: 'rgba(41, 98, 255, 0)',
        priceFormat: {
          type: 'price',
          precision: 8,
          minMove: 0.00000001,
        },
      });

      series.setData(data);
      chart.timeScale().fitContent();

      chartRef.current = chart;
      seriesRef.current = series;
    }
  }, [size, data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!loading && size) {
      if (!chartRef.current) {
        initChart();
      } else {
        chartRef.current.resize(size.width, size.width * 0.5);
        chartRef.current.timeScale().fitContent();
        if (seriesRef.current) {
          seriesRef.current.setData(data); // Update series data if chart already exists
        }
      }
    }
  }, [loading, size, initChart, data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData().then(() => {
        if (seriesRef.current && data.length > 0) {
          seriesRef.current.update(data[data.length - 1]);
        }
      });
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [fetchData, data]);

  return (
    <div ref={containerRef} className="flex w-full md:w-[80%] flex-col gap-2">
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </Box>
      ) : null}
    </div>
  );
};
