import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, CardBody, CardFooter, Chip, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { AppContext } from '../../../../StoreContext/StoreContext';
import axios from 'axios';
import AppLoader from '../../../../Loader';
import toast from 'react-hot-toast';

const TABLE_HEAD = ["ID", "Customer", "Address", "Delivery Date", "Product", "Size", "Payment", "Status", "Action"];

const OrderTable = () => {
  const [orderList, setOrderList] = useState([]);
  const { BASE_URL } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Predefined allowed statuses
  const allowedStatuses = ["Delivered", "Processing", "Cancelled", "Pending"];

  // Status colors
  const statusColors = {
    Delivered: "text-shippedBg bg-shippedBg/20",
    Processing: "text-processingBg bg-processingBg/20",
    Cancelled: "text-cancelBg bg-cancelBg/20",
    Pending: "text-pendingBg bg-pendingBg/20",
    default: "text-gray-500 bg-gray-200",
  };

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/orderlist/get`);
        setOrderList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    };
    fetchOrderList();
  }, []);

  const handleStatusChange = async (statusId, newStatus) => {
    if (!allowedStatuses.includes(newStatus)) {
      alert(`Invalid status: ${newStatus}`);
      return;
    }

    try {
      const response = await axios.patch(`${BASE_URL}/admin/orderlist/${statusId}/status`, { status: newStatus });
      console.log("Status updated successfully:", response.data);
      toast.success("Status updated!")

      // Optimistically update the UI
      setOrderList((prevList) =>
        prevList.map((order) =>
          order._id === statusId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.response?.data?.message || error.message);
      alert(`Failed to update status: ${error.response?.data?.message || error.message}`);
    }
  };

  // Get current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrderList = orderList.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle next and prev page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(orderList.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {isLoading || orderList.length === 0 ? (
        <div className="col-span-2 flex justify-center items-center h-[50vh]">
          <AppLoader />
        </div>
      ) : (
        <Card className="w-full shadow-sm rounded-xl bg-white border-[1px]">
          <CardBody>
            <table className="w-full table-auto text-left border-collapse">
              <thead>
                <tr className='bg-quaternary'>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 p-4 text-center">
                      <Typography
                        variant="small"
                        className="font-semibold font-custom text-secondary leading-none text-base uppercase"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentOrderList.map((order, index) => {
                  const isLast = index === currentOrderList.length - 1;
                  const classes = isLast
                    ? "p-4 text-center"
                    : "p-4 border-b border-gray-300 text-center";

                  return (
                    <tr key={order._id}>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal font-custom text-sm">
                          {order.orderId}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal font-custom text-sm">
                          {order.userId.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal font-custom text-sm">
                          {order.addressId.address}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal font-custom text-sm">
                          {order.createdAt}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal font-custom text-sm">
                          {order.products?.[0]?.productId?.title || "N/A"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal font-custom text-sm">
                          {order.products?.[0]?.size || "N/A"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal font-custom text-sm">
                          {order.paymentMethod}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Chip
                          className={`capitalize text-sm text-center font-normal ${statusColors[order.status] || statusColors.default}`}
                          value={order.status}
                        />
                      </td>
                      <td className={classes}>
                        <Menu placement="bottom-end" className="outline-none">
                          <MenuHandler>
                            <IconButton variant="text">
                              <HiOutlineDotsHorizontal className="text-primary text-2xl cursor-pointer" />
                            </IconButton>
                          </MenuHandler>
                          <MenuList>
                            {allowedStatuses.map((status, index) => (
                              <MenuItem
                                key={index}
                                onClick={() => handleStatusChange(order._id, status)}
                                className={`font-custom capitalize ${statusColors[status]?.split(" ")[0]} hover:!text-buttonBg`}
                              >
                                {status}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button
              variant="outlined"
              size="sm"
              className='font-custom border-gray-300 font-normal capitalize text-sm cursor-pointer hover:bg-black hover:text-white'
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev. page
            </Button>

            <div className="flex items-center gap-2">
              {[...Array(Math.ceil(orderList.length / itemsPerPage))].map((_, index) => (
                <IconButton key={index} variant="text" size="sm" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </IconButton>
              ))}
            </div>

            <Button
              variant="outlined"
              size="sm"
              className='font-custom border-gray-300 font-normal capitalize text-sm cursor-pointer hover:bg-black hover:text-white'
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(orderList.length / itemsPerPage)}
            >
              Next page
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default OrderTable;
