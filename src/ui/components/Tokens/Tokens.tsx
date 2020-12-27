import * as React from "react";
import { useSelector } from "react-redux";
import BorderRadiusTokens from "./BorderRadiusTokens/BorderRadiusTokens";
import ColorTokens from "./ColorTokens/ColorTokens";
import FontSizeTokens from "./FontSizeTokens/FontSizeTokens";
interface Props {
  onDelete: any;
}

const Tokens = ({ onDelete }: Props) => {
  const tokens = useSelector((state: any) => state.tokens);

  return (
    <>
      <ColorTokens tokens={tokens} onDelete={onDelete} />
      <FontSizeTokens tokens={tokens} onDelete={onDelete} />
      <BorderRadiusTokens tokens={tokens} onDelete={onDelete} />
    </>
  );
};

export default Tokens;
