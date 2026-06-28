import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <Header name={settings?.name ?? "André Roslund"} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
