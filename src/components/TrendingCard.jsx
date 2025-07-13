function TrendingCard({ name, description, image, price }) {
  return (
    <section>
      <div className="card bg-base-100 w-70 shadow-sm h-100 cursor-pointer">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl h-full" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <div className="card-actions">
            <button className="btn btn-outline btn-success">
              <i class="fa-solid fa-cart-plus"></i>Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrendingCard;
