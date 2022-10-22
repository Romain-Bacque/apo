import { useState, useRef, useEffect } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import styled from "@emotion/styled";

// Style
const StyledMenuItem = styled(MenuItem)({
  padding: ".5rem 1rem",
  margin: "1rem 0",
  fontSize: "1.4rem",
  fontWeight: "bold",
  color: "rgb(75, 75, 75)",
  "&.active": {
    borderLeft: "2px solid gray",
    backgroundColor: "transparent",
  },
});

// Component
const AppMenu = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);
  const userRole = useSelector((state) => state.user.role);

  const handleLogout = (evt) => {
    dispatch({
      type: "LOGOUT",
    });
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
        <MenuRounded fontSize="large" sx={{ color: "white" }} />
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
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuList onClick={() => setOpen(false)}>
                    <StyledMenuItem
                      end // 'end' will ensure this component isn't matched as "active" when its descendant paths are matched.
                      activeclassname="active" // "active" class is added to DOM if the link is active.
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
                        Mes brasseries
                      </StyledMenuItem>
                    )}
                    {isLogged && (
                      <StyledMenuItem
                        activeclassname="active"
                        component={NavLink}
                        to="/events"
                      >
                        Evenements
                      </StyledMenuItem>
                    )}
                    {isLogged && (
                      <StyledMenuItem
                        activeclassname="active"
                        component={NavLink}
                        to="/profil"
                      >
                        Profil
                      </StyledMenuItem>
                    )}
                    {!isLogged && (
                      <StyledMenuItem
                        activeclassname="active"
                        component={NavLink}
                        to="/Login"
                      >
                        Connexion
                      </StyledMenuItem>
                    )}
                    {isLogged && (
                      <StyledMenuItem
                        component={NavLink}
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
};

export default AppMenu;
