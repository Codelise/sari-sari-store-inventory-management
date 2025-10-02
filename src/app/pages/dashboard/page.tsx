export default function Tindahan() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#F8F8F8] group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <header className="flex items-center justify-between whitespace-nowrap bg-white border-b border-solid border-b-[#f0f4f0] px-10 py-3 rounded-t-lg shadow-sm">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4 text-[#333333]">
                  <div className="size-6 text-[#4CAF50]">
                    <span className="material-symbols-outlined !text-4xl">
                      store
                    </span>
                  </div>
                  <h2 className="text-[#333333] text-xl font-bold leading-tight tracking-[-0.015em]">
                    Sari-Sari Tracker
                  </h2>
                </div>
                <div className="hidden md:flex items-center gap-9">
                  <a
                    className="text-[#333333] text-sm font-medium leading-normal"
                    href="#"
                  >
                    Inventory
                  </a>
                  <a
                    className="text-[#666666] text-sm font-medium leading-normal"
                    href="#"
                  >
                    Sales History
                  </a>
                  <a
                    className="text-[#666666] text-sm font-medium leading-normal"
                    href="#"
                  >
                    Reports
                  </a>
                </div>
              </div>
              <div className="flex flex-1 justify-end gap-4">
                <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f4f0] text-[#333333] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                  <div
                    className="text-[#333333]"
                    data-icon="User"
                    data-size="20px"
                    data-weight="regular"
                  >
                    <span className="material-symbols-outlined">person</span>
                  </div>
                </button>
              </div>
            </header>
            <main className="p-4 md:p-6 lg:p-8 bg-white shadow-sm rounded-b-lg">
              <div className="p-4 @container">
                <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start shadow-[0_0_4px_rgba(0,0,0,0.1)] bg-[#4CAF50]">
                  <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-6 px-6">
                    <p className="text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
                      ₱ 1,500.00
                    </p>
                    <div className="flex items-end gap-3 justify-between">
                      <p className="text-white/80 text-base font-normal leading-normal">
                        Today's Total Sales
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-3">
                <div className="w-full md:w-1/3">
                  <label className="flex flex-col min-w-40 h-12 w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                      <div className="text-[#666666] flex border-none bg-[#f0f4f0] items-center justify-center pl-4 rounded-l-lg border-r-0">
                        <span className="material-symbols-outlined">
                          search
                        </span>
                      </div>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#333333] focus:outline-0 focus:ring-0 border-none bg-[#f0f4f0] focus:border-none h-full placeholder:text-[#666666] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                        placeholder="Search products"
                        value=""
                      />
                    </div>
                  </label>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#f0f4f0] p-1">
                    <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-[#333333] text-[#666666] text-sm font-medium leading-normal">
                      <span className="truncate">Name</span>
                      <input
                        className="invisible w-0"
                        name="sort-options"
                        type="radio"
                        value="Name"
                      />
                    </label>
                    <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-[#333333] text-[#666666] text-sm font-medium leading-normal">
                      <span className="truncate">Quantity</span>
                      <input
                        className="invisible w-0"
                        name="sort-options"
                        type="radio"
                        value="Quantity"
                      />
                    </label>
                    <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-[#333333] text-[#666666] text-sm font-medium leading-normal">
                      <span className="truncate">Price</span>
                      <input
                        className="invisible w-0"
                        name="sort-options"
                        type="radio"
                        value="Price"
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full md:w-auto flex justify-end">
                  <button className="flex w-full md:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#4CAF50] text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-sm hover:bg-opacity-90 transition-all">
                    <span className="truncate">Add New Product</span>
                  </button>
                </div>
              </div>
              <div className="mt-4 px-4 py-3 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.05)] flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <p className="text-[#333333] text-lg font-semibold">
                        Nissin Cup Noodles
                      </p>
                      <p className="text-[#666666] text-sm">Supplier: URC</p>
                    </div>
                    <div className="flex items-center gap-8 text-center">
                      <div className="w-24">
                        <p className="text-[#666666] text-sm">Price</p>
                        <p className="text-[#333333] font-medium">₱ 30.00</p>
                      </div>
                      <div className="w-24">
                        <p className="text-[#666666] text-sm">Quantity</p>
                        <p className="text-[#333333] font-medium">120</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <span className="material-symbols-outlined !text-xl">
                          edit
                        </span>
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <span className="material-symbols-outlined !text-xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.05)] flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <p className="text-[#333333] text-lg font-semibold">
                        Coca-Cola (1.5L)
                      </p>
                      <p className="text-[#666666] text-sm">
                        Supplier: Coca-Cola PH
                      </p>
                    </div>
                    <div className="flex items-center gap-8 text-center">
                      <div className="w-24">
                        <p className="text-[#666666] text-sm">Price</p>
                        <p className="text-[#333333] font-medium">₱ 95.00</p>
                      </div>
                      <div className="w-24">
                        <p className="text-[#666666] text-sm">Quantity</p>
                        <p className="text-[#333333] font-medium">30</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <span className="material-symbols-outlined !text-xl">
                          edit
                        </span>
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <span className="material-symbols-outlined !text-xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.05)] flex items-center justify-between hover:shadow-md transition-shadow border-l-4 border-[#EF5350]">
                    <div className="flex-1">
                      <p className="text-[#333333] text-lg font-semibold">
                        Magic Crackers
                      </p>
                      <p className="text-[#666666] text-sm">
                        Supplier: Universal Robina
                      </p>
                    </div>
                    <div className="flex items-center gap-8 text-center">
                      <div className="w-24">
                        <p className="text-[#666666] text-sm">Price</p>
                        <p className="text-[#333333] font-medium">₱ 15.00</p>
                      </div>
                      <div className="w-24">
                        <p className="text-[#666666] text-sm">Quantity</p>
                        <p className="font-medium low-stock-warning">4</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <span className="material-symbols-outlined !text-xl">
                          edit
                        </span>
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <span className="material-symbols-outlined !text-xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.05)] flex items-center justify-between hover:shadow-md transition-shadow border-l-4 border-[#EF5350]">
                    <div className="flex-1">
                      <p className="text-[#333333] text-lg font-semibold">
                        Bear Brand Milk (Powder)
                      </p>
                      <p className="text-[#666666] text-sm">Supplier: Nestlé</p>
                    </div>
                    <div className="flex items-center gap-8 text-center">
                      <div className="w-24">
                        <p className="text-[#666666] text-sm">Price</p>
                        <p className="text-[#333333] font-medium">₱ 25.00</p>
                      </div>
                      <div className="w-24">
                        <p className="text-[#666666] text-sm">Quantity</p>
                        <p className="font-medium low-stock-warning">2</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <span className="material-symbols-outlined !text-xl">
                          edit
                        </span>
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <span className="material-symbols-outlined !text-xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
