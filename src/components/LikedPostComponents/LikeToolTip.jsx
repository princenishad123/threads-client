import {
  Button,
  Tooltip,
  TooltipAction,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
} from "keep-react";
import { FiHeart } from "react-icons/fi";

const LikeToolTip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipAction asChild className="w-0">
          <Button className=" size-auto p-0 bg-transparent hover:bg-transparent">
            <FiHeart size={28} />
          </Button>
        </TooltipAction>
        <TooltipContent side="right">
          <TooltipArrow />
          <p className="text-body-5 font-medium text-white">
            Tooltip - Title here
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LikeToolTip;
