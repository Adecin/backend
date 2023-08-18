import Heder from "@/components/heder";
import Sidebar from "@/components/sidenavbar";
import { Roboto } from "next/font/google";
import { useLayoutEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { useRouter, usePathname } from "next/navigation";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  return (
    <div className={roboto.className}>
      {/* <div>
          <Heder />
        </div> */}
      <div className="flex w-[100%] h-[100vh]" style={{
            overflow: "hidden",
          }}>
        <div className="min-h-[100%]" style={{
            overflow: "auto",
          }}>
          {pathName === `/login` ? "" : <Sidebar />}
        </div>
        <div
          className="w-[100%]  h-[100vh]"
          style={{
            overflow: "auto",
          }}
        >
          <ReduxProvider store={store}>{children}</ReduxProvider>
        </div>
      </div>
    </div>
  );
}
