import { Box, Tooltip } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import {
  createEditor,
  Editor,
  Node,
  Path,
  Range,
  Text,
  Transforms,
} from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Leaf } from "../Leaf";
import styles from "./RichTextEditor.module.css";

const withTrackingLink = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "tooltip" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "tooltip" ? true : isVoid(element);
  };

  return editor;
};

const RichTextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);
  const [tracking_link] = useState("{{TRAKING_LINK}}");

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "tooltip":
        return <TooltipElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // const handleKeyUp = (event) => {
  //   const regex = new RegExp(/{{TRACKING_LINK}}/g);
  //   if (event.key === "`" && event.ctrlKey) {
  //     // Prevent the "`" from being inserted by default.
  //     event.preventDefault();
  //     // Otherwise, set the currently selected blocks type to "code".
  //     Transforms.setNodes(
  //       editor,
  //       { type: "tooltip" },
  //       { match: (n) => Editor.isBlock(editor, n) }
  //     );
  //   }
  // };

  return (
    <Box className={styles.container}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}>
        <Editable
          renderElement={renderElement}
          renderLeaf={(props) => <Leaf {...props} />}
          className={styles.editor}
          onKeyDown={(event) => {
            if (event.key === "`" && event.ctrlKey) {
              // Prevent the "`" from being inserted by default.
              event.preventDefault();
              // Otherwise, set the currently selected blocks type to "code".
              const mention = {
                type: "tooltip",
                children: [{ text: "hello World" }],
              };
              Node.fragment(editor, mention);
              console.log(editor);
              // Transforms.setNodes(
              //   editor,
              //   { type: "tooltip" },
              //   {
              //     match: (n) => {
              //       if (n.text) {
              //         console.log(n.text);
              //         console.log(tracking_link);
              //       }
              //     },
              //   }
              // );
            }
          }}
        />
      </Slate>
    </Box>
  );
};

const TooltipElement = (props) => {
  return (
    <Tooltip
      {...props.attributes}
      label="Hello World"
      placement="top-end"
      hasArrow>
      <span>{props.children}</span>
    </Tooltip>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export { RichTextEditor };
