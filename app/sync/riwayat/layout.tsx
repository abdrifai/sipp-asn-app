import CariASN from "@/app/components/CariASN";
import InfoPanel from "@/app/components/InfoPanel";
import ModalSearch from "@/app/components/search/Modal-Search";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="bg-gray-200 w-1/4 h-screen">
        <nav>
          <ul>
            <li className="p-4">Menu 1</li>
            <li className="p-4">Menu 2</li>
            <li className="p-4">Menu 3</li>
          </ul>
        </nav>
      </aside>
      {/* content */}
      <main className="flex-1">
        <header className="bg-gray-300 p-4">
          <h1 className="text-2xl">Header</h1>
        </header>
        <div className="p-4">
          <h2 className="text-xl">Content</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
            ipsum ut urna hendrerit semper id in eros. Nam maximus ipsum eget
            tristique rhoncus. Proin vulputate placerat semper. Fusce commodo
            lectus in ligula consectetur, sed pellentesque tellus accumsan.
            Vestibulum interdum lectus sit amet enim iaculis sollicitudin. Sed
            pellentesque gravida odio, in posuere sem aliquam non. Duis
            efficitur facilisis nisl id facilisis. Integer gravida purus ac
            dapibus facilisis. Nunc fringilla sagittis congue. Sed tempus
            vestibulum diam id cursus.
          </p>
        </div>
      </main>
      {/* <div className="container pt-4">{children}</div> */}
    </div>
  );
}
