import React, { useState, useEffect, useContext } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { PlaceMenu } from './PlaceMenu';
import MonthMenu from './MonthMenu';
import axios from 'axios';
import { AppContext } from '../../../../StoreContext/StoreContext';
import AppLoader from '../../../../Loader';

const SalesGraph = () => {
    const [graphData, setGraphData] = useState([]);
    const { BASE_URL } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true)
    const [selectedMonthGraph, setSelectedMonthGraph] = useState(12);

    useEffect(() => {
        const fetchGraphDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/admin/dashboard/view-graph?month=${selectedMonthGraph}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const formattedData = response.data.data.map(item => ({
                    x: item.monthName,
                    y: item.totalRevenue
                }));
                setGraphData(formattedData);
                setIsLoading(false)
            } catch (error) {
                console.log(error);
            }
        };
        fetchGraphDetails();
    }, [BASE_URL]);

    return (
        <div className='p-10 mt-10 bg-white rounded-xl shadow-md'>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-medium mb-0 text-secondary">Sales Details</h1>
                </div>
                <ul className="flex items-center gap-2">
                    <li><PlaceMenu /></li>
                    <li>
                        <MonthMenu onSelectMonth={(month) => setSelectedMonthGraph(month)} />
                    </li>
                </ul>
            </div>
            {isLoading ? (
                <div className="col-span-2 flex justify-center items-center h-[70vh]">
                    <AppLoader />
                </div>
            ) : (
                <>
                    <div className='w-[100%]'>
                        <LineChart
                            xAxis={[{
                                data: graphData.map(item => item.x),
                                tickNumber: 12,
                                scaleType: 'point',
                                valueFormatter: (value) => value,
                            }]}
                            yAxis={[{
                                min: 0,
                                tickNumber: 5,
                                valueFormatter: (value) => `$${value}`,
                            }]}
                            series={[{
                                data: graphData.map(item => item.y),
                                curve: 'linear',
                                area: true,
                                color: '#A3BDF533',
                            }]}
                            className="w-full"
                            height={500}
                            grid={{ vertical: false, horizontal: true }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default SalesGraph;
