import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFAFA]">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-6 py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#6D8196]">
              Live Auction Marketplace
            </p>

            <h1 className="text-5xl font-black tracking-tight text-[#000080] sm:text-6xl">
              Bid. Sell. Win.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6D8196]">
              Discover unique items, join live auctions, and compete with
              bidders in real time on HAMMR.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/auctions"
                className="rounded-xl bg-[#000080] px-6 py-3.5 text-sm font-bold text-[#FFFAFA] transition hover:bg-[#000080]/90"
              >
                Explore Auctions
              </a>

              <a
                href="/register"
                className="rounded-xl border border-[#000080] px-6 py-3.5 text-sm font-bold text-[#000080] transition hover:bg-[#ADD8E6]/30"
              >
                Start Selling
              </a>
            </div>
          </div>
        </section>

        {/* Basic Features */}
        <section className="border-t border-[#6D8196]/20 bg-[#ADD8E6]/10 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-[#6D8196]/20 bg-[#FFFAFA] p-6">
                <h2 className="text-lg font-bold text-[#000080]">
                  Live Auctions
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6D8196]">
                  Participate in auctions and see bidding activity in real time.
                </p>
              </div>

              <div className="rounded-2xl border border-[#6D8196]/20 bg-[#FFFAFA] p-6">
                <h2 className="text-lg font-bold text-[#000080]">
                  Secure Bidding
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6D8196]">
                  A secure platform designed for buyers and sellers.
                </p>
              </div>

              <div className="rounded-2xl border border-[#6D8196]/20 bg-[#FFFAFA] p-6">
                <h2 className="text-lg font-bold text-[#000080]">
                  Sell Your Items
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#6D8196]">
                  Create auctions and connect with interested bidders.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
