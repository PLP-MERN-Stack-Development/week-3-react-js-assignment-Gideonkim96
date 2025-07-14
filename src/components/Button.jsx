export default function Button({ children, variant = "primary", ...props }) {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button className={`px-4 py-2 rounded ${styles[variant]} transition`} {...props}>
      {children}
    </button>
  );
}