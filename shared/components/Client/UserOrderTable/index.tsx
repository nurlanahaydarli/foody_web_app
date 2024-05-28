import { useEffect } from "react";
import { getOrder } from "../../../services";
import { useGlobalStore } from "../../../services/provider";
import { UserOrderTableDatas } from "../UserOrderTableDatas";
export function UserOrderTable() {
  const { orderData, setOrderData } = useGlobalStore();
  const { orderShow, setOrderShow } = useGlobalStore();

  const fetchOrder = async () => {
    try {
      const res = await getOrder();
      const result = res?.data.result.data || [];
      setOrderShow(res);
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
              Time
            </th>
            <th className="py-2 px-4 border-b ">
              Delivery Adress
            </th>
            <th className="py-2 px-4 border-b ">
              Amount
            </th>
            <th className="py-2 px-4 border-b ">
              Payment Method
            </th>
            <th className="py-2 px-4 border-b ">
              Contact
            </th>
            <th className="py-2 px-4 border-b border-whiteLight3"></th>
          </tr>
        </thead>
        <tbody>
        {orderData?.map((item: any, index: number) => (
            <UserOrderTableDatas
              key={`tableData_${index}`}
              id={item.id}
              time="12:50"
              adress={item.delivery_address}
              amount={item.amount}
              payment={item.payment_method == 1 ? "Credit Card" : "Pay Cash"}
              contact={item.contact}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};