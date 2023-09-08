//  public pages

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import jwtDecode from "jwt-decode";
import styleds from "@emotion/styled";
import Error from "next/error";
const publicPage = ["login.tsx"];
const publicRoutes = ["/login"];

const Auth = (props: any) => {
  const router = useRouter();
  const path = router.pathname;

  let pageNameArray: any = [];

  if (props.children._source) {
    pageNameArray = props.children._source.fileName.split(`\\`);
    if (pageNameArray.length === 1) {
      pageNameArray = props.children._source.fileName.split("/");
    }
  }

  const pageName = pageNameArray[pageNameArray.length - 1];
  const checkPublic = pageNameArray[pageNameArray.length - 2] === "pages";

  const [token, setToken] = useState<any>("");

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(counter + 1);
    setToken(localStorage.getItem("token"));
    if (publicRoutes.includes(router.route)) {
      // Allow guest access for those pages
      console.log(`public page true`);
    } else if (props.children._source) {
      if (!publicPage.includes(pageName) && checkPublic) {
        console.log(`not public page`);
        if (token == null || undefined) {
          console.log(`no token avail`);
          router.push("/login");
        }
      }
    }
  }, [token]);

  console.log(checkPublic);

  if (!publicPage.includes(path.split("/")[1])) {
    return props.children;
  } else {
    if (token) {
      console.log(`token`, token);
      try {
        const tokens: any = jwtDecode(token);
        console.log(`tokensdata`, tokens.data);
      } catch (error) {
        if (counter > 0) {
          router?.push("/login");
        }
      }
    } else {
      if (counter > 0) {
        router?.push("/login");
      }
    }
  }

  console.log(`routes`, path);

  return props.children;
};

//   console.log(token);?

export default Auth;
