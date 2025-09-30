import Header from "./components/Header";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <Header />
      <div className="layout-container flex h-full grow flex-co l mx-9">
        <main className="flex flex-1 justify-center py-5 pt-20 bg-gray-50">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Hero Section */}
            <section className="relative">
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Background image */}
              <div
                className="bg-center bg-no-repeat bg-cover "
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgdll0Tq6QN7cDOwAh9e6tKXYM-ejtOiwLQwo5Jw8v7LBInkPIzJh4r3nBEHYw4XsiNadhJrs8xyoThe1SK0zpAmGNLZ-Wjc2QeJ7euMswttJ4Fstmsdrota5kbg7SRLtTbpfjiuZEA4TLO0MtQOIkKJWzBsSYNFd5i7FG2GPI4Mk-dSAnafM9nu_v96ufYGEB5tTkNk5S1d8uvbIw6ojFSgk0rJqF6Vv12qdGkmuIbP66bp0w3N6tlCcuSPqOMkBWvVUXlcJu6Fsw')",
                }}
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 py-24 text-center text-white">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] sm:text-6xl">
                      Effortless Inventory &amp; Sales for Your Sari-Sari Store
                    </h1>
                    <h2 className="text-base font-normal text-gray-200 sm:text-lg">
                      Track stock, monitor sales, and gain insights – all in one
                      simple app.
                    </h2>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      href="/signup"
                      className="flex h-12 min-w-[120px] cursor-pointer items-center justify-center rounded-lg bg-green-600 px-6 text-base font-bold text-white shadow-lg transition hover:shadow-xl"
                    >
                      Sign Up Free
                    </Link>
                    <Link
                      href="/login"
                      className="flex h-12 min-w-[120px] cursor-pointer items-center justify-center rounded-lg bg-white px-6 text-base font-bold text-gray-800 shadow-lg transition hover:shadow-xl"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <div className="flex flex-col gap-10 px-4 py-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-gray-800 text-3xl sm:text-4xl font-bold leading-tight max-w-[720px]">
                  Why Choose Sari-Sari Tracker?
                </h1>
                <p className="text-gray-600 text-base max-w-[720px]">
                  Our app is designed to help you manage your store with ease,
                  so you can focus on what matters most: growing your business.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="text-green-600">
                    <span className="material-symbols-outlined text-2xl">
                      inventory_2
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-gray-800 text-base font-bold">
                      Smart Inventory Management
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Never run out of popular items. Get alerts for low stock
                      and track all your products effortlessly.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="text-green-600">
                    <span className="material-symbols-outlined text-2xl">
                      monitoring
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-gray-800 text-base font-bold">
                      Real-time Sales Tracking
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Record daily sales quickly and see your earnings grow
                      instantly. Understand what sells best.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="text-green-600">
                    <span className="material-symbols-outlined text-2xl">
                      insights
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-gray-800 text-base font-bold">
                      Actionable Business Insights
                    </h2>
                    <p className="text-gray-600 text-sm">
                      View powerful reports and analytics to make informed
                      decisions and boost your profit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="flex flex-col gap-6 px-5 py-10 text-center mt-auto">
              <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-row sm:justify-around">
                <a
                  href="#"
                  className="text-gray-600 text-base min-w-40 hover:text-gray-800"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-600 text-base min-w-40 hover:text-gray-800"
                >
                  Terms of Service
                </a>
              </div>
              <p className="text-gray-600 text-base">
                © 2024 Sari-Sari Tracker. All rights reserved.
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
