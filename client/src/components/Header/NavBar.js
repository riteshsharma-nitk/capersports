import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

export default function Appbar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {matches ? <Mobile matches={matches}/> : <Desktop matches={matches}/>}
     
    </>
  );
}