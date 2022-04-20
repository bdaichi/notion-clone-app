import { IconButton } from "@material-ui/core";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import PageContent from "../component/page/page_contents";
import { SignInContext } from "../context/SignInContext";
import PageList from "../component/page/page_list";

export default function Pages() {
  const { currentUser, reloadCurrentUserData } = useContext(SignInContext);
  const router = useRouter();

  const [isOpenPageList, setIsOpenPageList] = useState(false);
  const [pageId, setPageId] = useState("");

  const openPageList = () => {
    setIsOpenPageList(true);
  };

  const closePageList = () => {
    setIsOpenPageList(false);
  };

  useEffect(() => {
    reloadCurrentUserData();
    if (!currentUser) {
      router.push("/sign_In");
    }
  }, []);

  return (
    <>
      {currentUser && (
        <>
          <div className="flex md:flex-row" style={{ width: "100%" }}>
            <div
              className="hidden md:grid"
              style={{
                minHeight: "800px",
                height: "100%",
                backgroundColor: "#e1f5fe",
                width: "40%",
              }}
            >
              <PageList setPageId={setPageId} userId={currentUser.userId} />
            </div>
            <div className="">
              {!isOpenPageList ? (
                <div
                  className="flex justify-center z-10"
                  style={{ width: "100%", height: "100%" }}
                >
                  <PageContent pageId={pageId} />
                </div>
              ) : (
                <div className="hidden" style={{ width: "100%" }}>
                  <PageContent pageId={pageId} />
                </div>
              )}
            </div>
          </div>
          /* sm(スマホ用のドロワー表示 isOpenで表示と非表示を切り替える) */
          <div className="fixed top-5 left-5 md:hidden z-20">
            {!isOpenPageList ? (
              <IconButton onClick={openPageList}>
                <ArrowForwardIosIcon />
              </IconButton>
            ) : (
              <div>
                <IconButton>
                  <ArrowBackIosNewIcon onClick={closePageList} />
                </IconButton>
                <div
                  className="z-10"
                  style={{
                    minHeight: "900px",
                    height: "100%",
                    backgroundColor: "#e1f5fe",
                  }}
                >
                  <PageList setPageId={setPageId} userId={currentUser.userId} />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
