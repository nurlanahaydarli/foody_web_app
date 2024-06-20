import { useEffect, useState } from "react";
import {getOrder, getOrderByUser} from "../../../services";
import { UserOrderTableDatas } from "../UserOrderTableDatas";
import { useTranslation } from "next-i18next";
import formatDate from "../../../../server/helper/convertDateToDAy";
export function UserOrderTable() {
  const [orderData, setOrderData] = useState([]);
  const [orderShow, setOrderShow] = useState(false);
  const { t } = useTranslation("common");

  const fetchOrder = async () => {
    try {
      const res = await getOrderByUser();
      const result = res?.data.result.data as [];
      setOrderShow(!!result.length);
      setOrderData(result);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  // bg-grayText1 bg-opacity-50
  return (
    <section className="max-w-full overflow-x-auto ">
      <table className=" min-w-full bg-white text-center">
        <thead>
          <tr className="border-solid border-b-2 border-whiteLight3" >
            <th className="py-2 px-4 border-b ">ID</th>
            <th className="py-2 px-4 border-b ">
             {t("Time")}
            </th>
            <th className="py-2 px-4 border-b ">
            {t("Delivery Address")}
            </th>
            <th className="py-2 px-4 border-b ">
            {t("Amount")}
            </th>
            <th className="py-2 px-4 border-b ">
            {t("Paymnet Method")}
            </th>
            <th className="py-2 px-4 border-b ">
            {t("Contact")}
            </th>
            <th className="py-2 px-4 border-b border-whiteLight3"></th>
          </tr>
          </thead>
          <tbody>
          {orderData.map((item: any, index: number) => (
              <UserOrderTableDatas
                  key={`tableData_${index}`}
                  customer_id={index+1}
                  id={item.id}
                  time={formatDate(item.created)} // Assuming a way to get actual time from the data
                  adress={item.delivery_address}
                  amount={item.amount}
                  payment={item.payment_method === "1" ? "Cash" : "Delivery"}
                  contact={item.contact}
                  fetchOrder={fetchOrder}
              />
          ))}
        </tbody>
      </table>
    </section>
  );
};

// import { useEffect, useState } from "react";
// import { getOrder } from "../../../services";
// import { UserOrderTableDatas } from "../UserOrderTableDatas";

// export function UserOrderTable() {
//   const [orderData, setOrderData] = useState<any[]>([]); // Use a more specific type if possible

//   const fetchOrder = async () => {
//     try {
//       const res = await getOrder();
//       const result = res?.data.result.data || []; // Assuming nested structure
//       setOrderData(result);
//     } catch (error) {
//       console.error("Error fetching order:", error);
//     }
//   };

//   useEffect(() => {
//     fetchOrder();
//   }, []);

//   return (
//       <section className="max-w-full overflow-x-auto ">
//         <table className="min-w-full bg-white text-center">
//           <thead>
//           <tr className="border-solid border-b-2 border-whiteLight3">
//             <th className="py-2 px-4 border-b">ID</th>
//             <th className="py-2 px-4 border-b">Time</th>
//             <th className="py-2 px-4 border-b">Delivery Address</th>
//             <th className="py-2 px-4 border-b">Amount</th>
//             <th className="py-2 px-4 border-b">Payment Method</th>
//             <th className="py-2 px-4 border-b">Contact</th>
//             <th className="py-2 px-4 border-b border-whiteLight3"></th>
//           </tr>
//           </thead>
//           <tbody>
//           {orderData.map((item: any, index: number) => (
//               <UserOrderTableDatas
//                   key={`tableData_${index}`}
//                   id={item.id}
//                   time="12:50" // Assuming a way to get actual time from the data
//                   adress={item.delivery_address}
//                   amount={item.amount}
//                   payment={item.payment_method === 1 ? "Credit Card" : "Pay Cash"}
//                   contact={item.contact}
//               />
//           ))}
//           </tbody>
//         </table>
//       </section>
//   );
// }
