import KirtiAI from "@/components/kirti-ai";

function Page() {
  return (
    <div
      style={{
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 0, // Only this corner is different
      }}
    >
      <KirtiAI />
    </div>
  );
}

export default Page;
