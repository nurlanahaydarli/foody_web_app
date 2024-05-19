import Image from "next/image";


export function UserOrderDetailDatas() {


  return (
    <tr className="border-solid border-b-2 border-whiteLight3">
      <td  className="py-2 px-4 border-b">
        <Image width={30} height={0} src="" alt="image" />
      </td>
      <td  className="py-2 px-4 border-b ">name</td>
      <td  className="py-2 px-4 border-b ">$5</td>
      <td className="py-2 px-4 border-b ">1</td>
      <td  className="py-2 px-4 border-b ">$10</td>
    </tr>
  );
};