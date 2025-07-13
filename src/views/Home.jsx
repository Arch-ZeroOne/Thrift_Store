import { useEffect, useState } from "react";
import Logo from "/hero-logo.svg";
import Navbar from "../components/Navbar";
import { getTrending } from "../firebase/products";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import TrendingCard from "../components/TrendingCard";

function Home() {
  return (
    <>
      <Navbar />
      <div className="font-[Ubuntu] flex flex-col gap-5">
        <section className=" flex mt-17 w-[90%] ml-auto mr-auto mb-20">
          <di v className="flex flex-col gap-5">
            <Hero />
            <Buttons />
          </di>

          <div className="w-300">
            <img src={Logo}></img>
          </div>
        </section>

        <Categories />
        <TrendingProducts />
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="flex flex-col gap-5 w-[90%] font-[Montserrat] ">
      <h1 className="font-bold text-5xl/16">
        Start<span className="text-success"> Buying</span> and
        <span className="text-primary"> Selling</span> Smarter — All in One
        Place
      </h1>
      <div>
        <p className="indent-3 font-medium">
          Buy. Sell. Grow. All in One Place. Discover a seamless platform where
          you can shop the best deals or launch your own store with ease.
          Whether you're a smart buyer or an ambitious seller, you're in the
          right place.
        </p>
      </div>
    </section>
  );
}

function Buttons() {
  return (
    <div className="flex items-center gap-6">
      <button className="btn btn-outline btn-primary">
        <i class="fa-solid fa-arrow-right-long"></i>
        Get Started
      </button>
      <button className="btn btn-outline btn-secondary">
        <i class="fa-solid fa-magnifying-glass-plus"></i>Learn More
      </button>
    </div>
  );
}

function Categories() {
  const categories = [
    {
      name: "Fashion",
      description:
        "Explore the latest trends in clothing, shoes, and accessories for men, women, and kids. Dress in style for every season and occasion.",
      icon: "fa-solid fa-shirt ",
    },
    {
      name: "Electronics",
      description:
        "Discover a wide range of electronics including smartphones, laptops, audio devices, and gadgets to keep you connected and entertained.",
      icon: "fa-solid fa-laptop-medical",
    },
    {
      name: "Home And Kitchen",
      description:
        "Upgrade your living space with stylish furniture, smart appliances, kitchen tools, and home décor essentials designed for comfort and convenience.",
      icon: "fa-solid fa-faucet-drip",
    },
    {
      name: "Automotive",
      description:
        "Shop car accessories, tools, and parts to keep your vehicle running smoothly and looking great. Find products for maintenance, upgrades, and safety.",
      icon: "fa-solid fa-screwdriver-wrench",
    },
  ];
  return (
    <div className="w-[90%] ml-auto mr-auto mb-15 flex flex-col gap-4">
      <h3 className="text-2xl font-bold"> Available Categories:</h3>
      <div className="flex items-center gap-4">
        {categories.map((data) => (
          <CategoryCard
            name={data.name}
            description={data.description}
            icon={data.icon}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ name, description, icon }) {
  return (
    <section className="card bg-primary text-primary-content w-80 h-50 cursor-pointer">
      <div className="card-body">
        <h2 className="card-title">
          <i className={icon}></i>
          {name}
        </h2>
        <p>{description}</p>
      </div>
    </section>
  );
}

function TrendingProducts() {
  const [trending, setTrending] = useState();

  useEffect(() => {
    const fetchTrending = async () => {
      const trendingProd = await getTrending();
      setTrending(trendingProd);
    };

    fetchTrending();
  }, []);

  return (
    <section>
      <div className=" flex items-center mr-auto ml-auto w-[90%]">
        <div className="w-full flex  flex-col ">
          <h2 className="text-3xl font-bold ">Trending Products</h2>
          <p>Explore Our Trending Products</p>
        </div>
        <button className="btn btn-neutral btn-outline">
          <i class="fa-solid fa-arrow-right-long"></i>
          <Link to="/allProduct">View All Products</Link>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8 p-2 w-[95%] mr-auto ml-auto mb-10">
        {trending &&
          trending.map((item) => (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={`allProduct/productinfo/${item.id}`}>
                  <TrendingCard
                    key={item.id}
                    name={item.data.product_name}
                    description={item.data.description}
                    image={item.data.image}
                    price={item.data.price}
                  />
                </Link>
              </motion.button>
            </>
          ))}
      </div>
    </section>
  );
}

export default Home;
