// hook import
import { useState, useRef, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
// component import
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import { NavLink } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
// action creator import
import { logout } from "../../../actions";
// styled component import
import { StyledMenuItem, StyledMenuRounded } from "./style";

// Component
function AppMenu() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);
  const userRole = useSelector((state) => state.user.role);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <IconButton ref={anchorRef} onClick={() => setOpen(true)} size="large">
        <StyledMenuRounded fontSize="large" />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper sx={{ padding: "1.5rem 6rem 1.5rem 3.5rem" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuList onClick={() => setOpen(false)}>
                    <StyledMenuItem
                      end // 'end' will ensure this component isn't matched as "active" when its descendant paths are matched.
                      activeclassname="active" // "active" class is added to the DOM if the link is active.
                      component={NavLink}
                      to="/"
                    >
                      Accueil
                    </StyledMenuItem>
                    {isLogged && userRole === "brewer" && (
                      <StyledMenuItem
                        activeclassname="active"
                        component={NavLink}
                        to="/breweries"
                      >
                        Mes Brasseries
                      </StyledMenuItem>
                    )}
                    {isLogged && (
                      <StyledMenuItem
                        activeclassname="active"
                        component={NavLink}
                        to="/favorites"
                      >
                        Mes Favories
                      </StyledMenuItem>
                    )}
                    {isLogged && (
                      <StyledMenuItem
                        activeclassname="active"
                        component={NavLink}
                        to="/eventCalendar"
                      >
                        Evénements
                      </StyledMenuItem>
                    )}
                    {isLogged && (
                      <StyledMenuItem
                        activeclassname="active"
                        component={NavLink}
                        to="/profile"
                      >
                        Mon Profil
                      </StyledMenuItem>
                    )}
                    {!isLogged && (
                      <StyledMenuItem
                        activeclassname="active"
                        component={NavLink}
                        to="/signin"
                      >
                        Connexion
                      </StyledMenuItem>
                    )}
                    {isLogged && (
                      <StyledMenuItem
                        variant="text"
                        component={Button}
                        onClick={handleLogout}
                      >
                        Se déconnecter
                      </StyledMenuItem>
                    )}
                  </MenuList>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default memo(AppMenu);
