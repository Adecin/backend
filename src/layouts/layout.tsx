import Heder from "@/components/heder";
import Sidebar from "@/components/sidenavbar";
import { Roboto } from "next/font/google";
import { useLayoutEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { useRouter, usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const noSlide = [
    `/login`,
    `/forget-password`,
    `/farmer/add`,
    `/field-officer/add`,
    `/field-officer/edit`,
  ];

  return (
    <div className={roboto.className}>
      {/* <div>
          <Heder />
        </div> */}
      <div className="flex w-[100%] h-[100vh]">
        <div className="h-[100%] overflow-hidden">
          {noSlide.includes(pathName) ? "" : <Sidebar />}
        </div>
        <div
          className="w-[100%]  h-[100vh]"
          style={{
            overflow: "auto",
          }}
        >
          <ToastContainer />
          <ReduxProvider store={store}>{children}</ReduxProvider>
        </div>
      </div>
    </div>
  );
}
