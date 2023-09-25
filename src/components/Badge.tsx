export const Badge = ({ children }: { children: string }) => (
  <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gray-300 text-gray-900 shadow">
    {children}
  </div>
);
