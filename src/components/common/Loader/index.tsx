const Loader = () => {
  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
            <div className="h-5 w-32 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>

          <div className="space-y-5.5 p-7">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full space-y-2.5 sm:w-1/2">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                  <div className="h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
                </div>
                <div className="w-full space-y-2.5 sm:w-1/2">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                  <div className="h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
                </div>
              </div>
            ))}

            <div className="space-y-2.5">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-24 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
            </div>

            <div className="mt-5 flex justify-end">
              <div className="h-10 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
