export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-blue-600 rounded-sm animate-pulse"></div>
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-8">
        <div className="h-10 w-60 bg-gray-200 rounded animate-pulse mb-6"></div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-16 bg-gray-100 rounded animate-pulse mb-4"></div>
              <div className="h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
