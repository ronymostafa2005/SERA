"use client";

// 
export type PaginatedResult<T> = {
  currentItems: T[];
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
};

export function paginate<T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): PaginatedResult<T> {
  const safePerPage = Math.max(itemsPerPage, 1);
  const totalItems = items.length;
  const totalPages = Math.max(Math.ceil(totalItems / safePerPage), 1);
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (page - 1) * safePerPage;
  const endIndex = Math.min(startIndex + safePerPage, totalItems);
  const currentItems = items.slice(startIndex, endIndex);

  return { currentItems, totalItems, totalPages, startIndex, endIndex };
}

export default function Pagination({
  totalPages,
  currentPage,
  handlepagechange,
}: {
  totalPages: number;
  currentPage: number;
  handlepagechange: (page: number) => void;
}) {

    return (


        <>
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => handlepagechange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500 transition-all"
                    >
                        السابق
                    </button>

                    <span className="px-6 py-2 text-white bg-slate-800 rounded-lg border border-emerald-500/20">
                        صفحة {currentPage} من {totalPages}
                    </span>

                    <button
                        onClick={() => handlepagechange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500 transition-all"
                    >
                        التالي
                    </button>
                </div>
            )}
        </>
    )
}