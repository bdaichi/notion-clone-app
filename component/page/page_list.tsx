import { Button, IconButton, List, TextField } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";

import { createPage, fetchUserPages } from "../../service/page_service";
import OriginallyPageList from "./originally_page_list";
import Page from "../../entity/Page";
import UserPageList from "./user_page_list";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  setPageId: Dispatch<SetStateAction<string>>;
  userId: string;
};

export default function PageList(props: Props) {
  const [isOpenAddPageField, setIsOpenAddPageField] = useState(false);
  const [isDataReload, setIsDataReload] = useState(false);
  const [pageName, setPageName] = useState("");

  const addPage = async () => {
    console.log("userId", props.userId);
    const pageData = Page.createPage(pageName, props.userId);
    await createPage(pageData);
    closeAddPageField();
    setIsDataReload(true);
  };

  const openAddPageField = () => {
    setIsOpenAddPageField(true);
  };

  const closeAddPageField = () => {
    setIsOpenAddPageField(false);
  };

  return (
    <List className="flex flex-col z-20">
      <div className="flex my-12 mx-12 flex-col">
        <OriginallyPageList setPageId={props.setPageId} userId={props.userId} />
        <div className="flex flex-row">
          <IconButton onClick={openAddPageField}>
            <AddIcon />
          </IconButton>
          <p className="flex items-center mr-8">ページを追加する</p>
        </div>
        <div>
          {isOpenAddPageField && (
            /* ページ追加時のTextfieldとButto表示 */
            <div className="flex flex-col">
              <TextField
                variant="outlined"
                style={{ backgroundColor: "white" }}
                label="ページ名"
                onChange={(e) => setPageName(e.target.value)}
              />
              <div className="flex flex-row justify-center my-4">
                <Button
                  variant="contained"
                  style={{ color: "white", backgroundColor: "blue", margin: 4 }}
                  onClick={addPage}
                >
                  <p className="mx-4">追加</p>
                </Button>
                <Button
                  variant="outlined"
                  style={{ color: "bule", backgroundColor: "white", margin: 4 }}
                  onClick={closeAddPageField}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          )}
        </div>
        <UserPageList
          setPageId={props.setPageId}
          userId={props.userId}
          isDataReload={isDataReload}
          setIsDataReload={setIsDataReload}
        />
      </div>
    </List>
  );
}
