import { Box, Tooltip } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import {
  createEditor,
  Node,
  Text,
} from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
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
      children: [{ text: "" }],
    },
  ]);
  const [tracking_link] = useState("{{TRACKING_LINK}}");

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "tooltip":
        return <TooltipElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const decorate = useCallback(
    ([node, path]) => {
      const ranges = []

      if (Text.isText(node)) {
        const { text } = node
        const parts = text.split(tracking_link)
        console.log(parts);
        let offset = 0

        parts.forEach((part, i) => {
          if (i !== 0) {
            ranges.push({
              anchor: { path, offset: offset - tracking_link.length },
              focus: { path, offset },
              tooltip: true,
            })
          }

          offset = offset + part.length + tracking_link.length
        })
      }
      console.log(ranges);

      return ranges
    },
    []
  );

  return (
    <Box className={styles.container}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}>
        <Editable
          decorate={decorate}
          renderLeaf={(props) => <Leaf {...props} />}
          className={styles.editor}
        />
      </Slate>
    </Box>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.tooltip) {
    return (
      <Tooltip {...attributes}>
        {children}
      </Tooltip>
    )
  }
  return <span {...attributes}>{children}</span>
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
