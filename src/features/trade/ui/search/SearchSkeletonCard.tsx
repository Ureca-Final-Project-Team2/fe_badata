export const SearchSkeletonCard = () => {
  return (
    <div className="group bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-12 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="h-px bg-gray-200 mb-2"></div>
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};