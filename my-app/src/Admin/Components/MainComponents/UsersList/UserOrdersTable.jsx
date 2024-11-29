import React from "react";
import { Card, Chip, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Product", "Payment", "Status", "Price"];

const TABLE_ROWS = [
  {
    id: "1",
    product: "Kurti",
    payment: "Credit Card",
    status: "pending",
    price: "2099",
  },
  {
    id: "2",
    product: "Kurti",
    payment: "UPI",
    status: "processing",
    price: "2099",
  },
  {
    id: "3",
    product: "Kurti",
    payment: "COD",
    status: "delivered",
    price: "2099",
  },
  {
    id: "4",
    product: "Kurti",
    payment: "Credit Card",
    status: "cancelled",
    price: "2099",
  },
  {
    id: "5",
    product: "Kurti",
    payment: "Credit Card",
    status: "shipped",
    price: "2099",
  },
];

const UserOrdersTable = () => {
  return (
    <>
      <h2 className="text-lg font-medium mb-5 text-secondary">Orders</h2>
      <Card className="w-full shadow-none bg-white">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-quaternary">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-gray-300 p-4 text-center"
                >
                  <Typography
                    variant="small"
                    className="font-semibold font-custom text-secondary text-base uppercase"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((item, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4 text-center"
                : "p-4 border-b border-gray-300 text-center";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal font-custom text-sm"
                    >
                      {item.product}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal font-custom text-sm"
                    >
                      {item.payment}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      className={`capitalize text-sm text-center font-normal ${
                        item.status === "delivered"
                          ? "text-deliveredBg bg-deliveredBg/20"
                          : item.status === "processing"
                          ? "text-processingBg bg-processingBg/20"
                          : item.status === "cancelled"
                          ? "text-cancelBg bg-cancelBg/20"
                          : item.status === "pending"
                          ? "text-pendingBg bg-pendingBg/20"
                          : item.status === "shipped"
                          ? "text-shippedBg bg-shippedBg/20"
                          : "text-gray-500 bg-gray-200"
                      }`}
                      value={item.status}
                    />
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal font-custom text-sm"
                    >
                      ₹{item.price}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default UserOrdersTable;
