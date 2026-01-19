import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import { useControl } from "../hooks/useControl";
import { useUserIsNewVersionAppSelector, useUserSelector } from "../context";
import { useIpc } from "../hooks";
import { Content } from "./Content";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#f00",
    color: "#f00",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const UserPopover = () => {
  useIpc();
  const isNewVersionApp = useUserIsNewVersionAppSelector();
  const { handleClick, handleClose, id, isOpen, anchorEl } = useControl();
  const user = useUserSelector();

  if (user === undefined) {
    return null;
  }

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        aria-describedby={id}
        aria-label="delete"
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          variant={isNewVersionApp ? "dot" : "standard"}
        >
          <Avatar
            sx={{ width: 28, height: 28 }}
            alt="profile"
            src={user.avatar || ""}
          />
        </StyledBadge>
      </IconButton>

      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Content />
      </Popover>
    </>
  );
};
