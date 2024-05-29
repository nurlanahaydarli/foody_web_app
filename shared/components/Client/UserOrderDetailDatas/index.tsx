import Image from "next/image";
interface OrderDataProps {
  image: string;
  name: string;
  amount: number | number;
  price: string | number;
  count: number;
}
  export const UserOrderDetailDatas: React.FC<OrderDataProps> = ({
    image,
    name,
    price,
    count,
    amount,
  }) => {
  return (
    <tr className="border-solid border-b-2 border-whiteLight3">
      <td  className="py-2 px-4 border-b">
        <img width={30} height={0} src={image} alt={image} />
      </td>
      <td  className="py-2 px-4 border-b ">{name}</td>
      <td  className="py-2 px-4 border-b ">${price}</td>
      <td className="py-2 px-4 border-b ">{count}</td>
      <td  className="py-2 px-4 border-b ">${amount}</td>
    </tr>
  );
};

// ---------------------------------