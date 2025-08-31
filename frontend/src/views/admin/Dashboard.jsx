import Header from "../../components/Header";
import Revenue from "../../charts/Revenue";
import SaleByCategory from "../../charts/SaleByCategory";
import {
  MoneyIcon,
  HumanIcon,
  TruckIcon,
  HumanPlus,
} from "../../components/Icons";

const statistic = [
  {
    id: 1,
    title: "Total Sale",
    amount: "$0",
    svg: MoneyIcon,
  },
  {
    id: 2,
    title: "Visitors",
    amount: 0,
    svg: HumanIcon,
  },

  {
    id: 3,
    title: "Orders",
    amount: 0,
    svg: TruckIcon,
  },
  {
    id: 4,
    title: "Customers",
    amount: 0,
    svg: HumanPlus,
  },
];
function Dashboard() {
  return (
    <div className="flex flex-col w-full overflow-scroll font-[Ubuntu] gap-2">
      <section className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-3">
          <Header />
        </div>
        <div className="w-full ">
          <StatisticCards />
        </div>
        <section className="w-full h-full flex items-center gap-3 justify-center">
          <div className="h-90 w-[50%]  shadow-2xl rounded-2xl p-2">
            <h2 className="font-bold">Total Revenue</h2>
            <Revenue />
          </div>
          <div className="shadow-2xl w-[50%] rounded-2xl h-90 p-2">
            <h2 className="font-bold">Sales By Category</h2>
            <SaleByCategory />
          </div>
        </section>
      </section>

      <section>
        <h2 className=" font-bold p-2">Best Seller Products</h2>
      </section>
    </div>
  );
}

function StatisticCards() {
  return (
    <div className="flex justify-around ">
      {statistic.map((stats) => (
        <Card
          key={stats.id}
          name={stats.title}
          value={stats.amount}
          Icon={stats.svg}
          id={stats.id}
        />
      ))}
    </div>
  );
}

function Card({ name, value, Icon }) {
  return (
    <section className="shadow-xl w-60 border border-gray-400/50 p-5 h-32 rounded-lg flex  gap-1 justify-between items-center ">
      <div className="flex flex-col gap-3">
        <p className=" text-lg font-bold ">{name}</p>
        <p className="text-blue-500 text-xl font-medium"> {value}</p>
      </div>
      <Icon />
    </section>
  );
}

export default Dashboard;
