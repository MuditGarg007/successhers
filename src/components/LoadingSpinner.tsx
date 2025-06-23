// components/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    
    <div className="backdrop-blur-md border p-4 rounded-full shadow-inner">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-700 border-t-transparent" />
  </div>

  );
}
