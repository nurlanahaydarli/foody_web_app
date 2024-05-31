import { useEffect, useState } from "react";
import { useGlobalStore } from "../../../services/provider";
import { UserOrderDetailDatas } from "../UserOrderDetailDatas";
import { getOrder } from "../../../services";
export const UserOrdersDetail = (id: any) => {
  const [orderShow, setOrderShow] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [filteredData, setFilteredData] = useState();


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
  function handleFilter() {
    let filteredData = orderShow?.data?.result?.data?.find((item: any) => {
      console.log(item?.id, "item?.iditem?.iditem?.id");
      
     return item?.id == id?.id  
    }  )
    setFilteredData(filteredData)
  }


  useEffect(() => {
    fetchOrder();

    handleFilter()


  }, []);

  console.log(id, "id");
  console.log(filteredData, "filteredData");



  return (
    <table className="min-w-full text-center ">
      <thead>
        <tr className="border-solid border-b-2 border-whiteLight3 ">
          <th className="py-2 px-4 border-b-2 ">
            Image
          </th>
          <th className="py-2 px-4 border-b ">
            Name
          </th>
          <th className="py-2 px-4 border-b ">
            Price
          </th>
          <th className="py-2 px-4 border-b ">
            Count
          </th>
          <th className="py-2 px-4 border-b ">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {console.log(filteredData)}
        {filteredData?.products?.map((item: any) => (
          <UserOrderDetailDatas
            image={item.img_url}
            name={item.name}
            price={item.price}
            count={item.count}
            amount={item.amount}
          />
        ))}
      </tbody>
    </table>
  );
};