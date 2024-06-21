import { useEffect, useState } from "react";
import { UserOrderDetailDatas } from "../UserOrderDetailDatas";
import { getOrder } from "../../../services";
import { useTranslation } from "next-i18next";

// Define types for the order data
interface Product {
  img_url: string;
  name: string;
  price: number;
  count: number;
  amount: number;
}

interface Order {
  id: number;
  products: Product[];
}

export const UserOrdersDetail = ({ id }: { id: number|string }) => {
  const [orderShow, setOrderShow] = useState<any>(null);
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [filteredData, setFilteredData] = useState<Order | undefined>();
  const { t } = useTranslation("common");
  const fetchOrder = async () => {
    try {
      const res = await getOrder();
      const result = res?.data?.result?.data || [];
      setOrderShow(res);
      setOrderData(result);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const handleFilter = () => {
    const filteredData = orderShow?.data?.result?.data?.find((item: Order) => {
      return item?.id === id;
    });
    setFilteredData(filteredData);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [orderShow, id]);


  return (
    <table className="min-w-full text-center">
      <thead>
        <tr className="border-solid border-b-2 border-whiteLight3">
          <th className="py-2 px-4 border-b-2"> {t("Image")}</th>
          <th className="py-2 px-4 border-b">{t("Name")}</th>
          <th className="py-2 px-4 border-b">{t("Price")} $</th>
          <th className="py-2 px-4 border-b">{t("Count")}</th>
          <th className="py-2 px-4 border-b">{t("Amount")}</th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.products?.map((item: Product, index: number) => (
          <UserOrderDetailDatas
            key={index}
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


// import { useEffect, useState } from "react";
// import { useGlobalStore } from "../../../services/provider"; // Assuming this is used
// import { UserOrderDetailDatas } from "../UserOrderDetailDatas";
// import { getOrder } from "../../../services";

// export const UserOrdersDetail = ({id}:{id:number | string}) => { // Ensure id has a type of number

//   const [orderData, setOrderData] = useState<any[]>([]); // Use a more specific type if possible
//   const [filteredOrder, setFilteredOrder] = useState<any | null>(); // Define type for filtered order

//   const fetchOrder = async () => {
//     try {
//       const res = await getOrder();
//       const result = res?.data.result.data || []; // Assuming nested structure
//       setOrderData(result);
//     } catch (error) {
//       console.error("Error fetching order:", error);
//     }
//   };

//   const handleFilter = () => {
//     const filtered = orderData.find((item) => item.id === id);
//     setFilteredOrder(filtered);
//   };

//   useEffect(() => {
//     fetchOrder();
//     handleFilter();
//   }, []);

//   return (
//       <table className="min-w-full text-center ">
//         <thead>
//         <tr className="border-solid border-b-2 border-whiteLight3 ">
//           <th className="py-2 px-4 border-b-2 ">Image</th>
//           <th className="py-2 px-4 border-b ">Name</th>
//           <th className="py-2 px-4 border-b ">Price</th>
//           <th className="py-2 px-4 border-b ">Count</th>
//           <th className="py-2 px-4 border-b ">Amount</th>
//         </tr>
//         </thead>
//         <tbody>
//         {filteredOrder && ( // Conditionally render only if filteredOrder exists
//             <>
//               {console.log(filteredOrder)}
//               {filteredOrder.products?.map((item: any) => ( // Check if products property exists before mapping
//                   <UserOrderDetailDatas
//                       image={item.img_url}
//                       name={item.name}
//                       price={item.price}
//                       count={item.count}
//                       amount={item.amount}
//                   />
//               ))}
//             </>
//         )}
//         </tbody>
//       </table>
//   );
// };