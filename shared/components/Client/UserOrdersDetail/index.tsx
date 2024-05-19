import { UserOrderDetailDatas } from "../UserOrderDetailDatas";
export function UserOrdersDetail() {
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

        <UserOrderDetailDatas />
      </tbody>
    </table>
  );
};