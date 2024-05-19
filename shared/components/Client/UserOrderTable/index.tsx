import { UserOrderTableDatas } from "../UserOrderTableDatas";
export function UserOrderTable() {

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
          <UserOrderTableDatas/>
        </tbody>
      </table>
    </section>
  );
};