function TrendingCard({ name, image, price }) {
  if (name.length > 12) {
    name = CompressName(name);
  }

  return (
    <section>
      <div className="card bg-base-100 w-80 shadow-sm h-80 cursor-pointer">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl h-full" />
        </figure>
        <div className="card-body items-center text-center w-full">
          <section className="flex items-center gap-3  p-1 rounded-3xl w-full justify-between bg-black  text-white border-2 border-gray-300/50 shadow-2xl">
            <div className="ml-auto mr-auto">{name}</div>
            <div className="bg-blue-800 p-2 rounded-4xl w-20">${price}</div>
          </section>
        </div>
      </div>
    </section>
  );
}

function CompressName(name) {
  return name.split("").splice(0, 12).join("") + "...";
}

export default TrendingCard;
