type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductDetailPage({
  params,
}: ProductPageProps) {
  return (
    <main className="min-h-screen bg-white px-8 py-32">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* IMAGE */}
        <div className="h-[500px] bg-neutral-200 rounded-[40px] flex items-center justify-center">
          Product Image
        </div>

        {/* DETAILS */}
        <div>

          <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
            Product Details
          </p>

          <h1 className="mt-6 text-5xl font-bold">
            Product #{params.id}
          </h1>

          <p className="mt-8 text-lg text-gray-600 leading-8">
            Premium skincare designed for radiant glowing skin.
          </p>

          <p className="mt-10 text-3xl font-bold">
            ₹499
          </p>

          <button className="mt-10 px-10 py-4 bg-black text-white rounded-full hover:opacity-90 transition">
            Buy Now
          </button>

        </div>

      </div>

    </main>
  );
}