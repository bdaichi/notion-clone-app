import { Button, IconButton } from "@material-ui/core";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

import { Dispatch, SetStateAction } from "react";
import Content from "../../entity/Content";

type Props = {
  setIsSelectField: Dispatch<SetStateAction<boolean>>;
  addContent: (type: string) => Promise<void>;
};

export default function SelectContentTypeField(props: Props) {
  const closeSelectField = () => {
    props.setIsSelectField(false);
  };

  const setContentType = (type: string) => {
    props.setIsSelectField(false);
    props.addContent(type);
  };

  return (
    <>
      <div className="flex flex-col fixed top-56 left-56 bg-white p-8 shadow-xl">
        <Button onClick={() => setContentType("text")}>
          <p>テキストメモ</p>
        </Button>
        <Button onClick={() => setContentType("checkBox")}>
          <p>チェックリスト</p>
        </Button>
      </div>
      <div className="flex fixed top-48 left-48 mt-2 ml-2">
        <IconButton onClick={closeSelectField}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </div>
    </>
  );
}
