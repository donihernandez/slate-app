import { Tooltip } from "@chakra-ui/react";

const TooltipElement = (props) => {
  console.log(props);
  return <Tooltip label="Hello World">{props.children}</Tooltip>;
};

export { TooltipElement };
