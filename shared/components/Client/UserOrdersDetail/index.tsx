import { useGlobalStore } from "../../../services/provider";
import { UserOrderDetailDatas } from "../UserOrderDetailDatas";
  export const UserOrdersDetail = (id: any) => {
  const { orderShow, setOrderShow } = useGlobalStore();
  let FilteredData = orderShow.data.result.data.filter(
    (item: any) => item.id == id.id
  );
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

        {FilteredData[0]?.products?.map((item: any) => (
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