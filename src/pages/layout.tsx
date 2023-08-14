import Heder from "@/components/heder";
import Sidebar from "@/components/sidenavbar";
import { Roboto } from "next/font/google";
import { useLayoutEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={roboto.className}>
      {/* <div>
          <Heder />
        </div> */}
      <div className="flex w-[100%] h-[100%]">
        <div className="h-[100%] overflow-hidden">
          <Sidebar />
        </div>
        <div className="w-[100%] overflow-auto h-[100vh]">
          <ReduxProvider store={store}>{children}</ReduxProvider>
        </div>
      </div>
    </div>
  );
}
