import Header from "@/components/header";
import HomeBody from "@/components/home-body";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header />
      <HomeBody />
    </div>
  );
}
