import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledMenuItem = styled(MenuItem)({
  padding: ".5rem 1rem",
  margin: "1rem 0",
  fontSize: "1.4rem",
  fontWeight: "bold",
  color: "rgb(75, 75, 75)",
  "&.Mui-selected": {
    borderLeft: "2px solid gray",
    backgroundColor: "transparent",
  },
});

const AppMenu = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const isLogged = useSelector((state) => state.user.isLogged);
  const userRole = useSelector((state) => state.user.role);

  const handleLogout = (evt) => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const handleClose = (event) => {
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

  const handleMenuItemClick = (_, index) => {
    setSelectedIndex(index);
  };

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <IconButton onClick={() => setOpen(true)} size="large">
          <MenuRounded fontSize="large" sx={{ color: "white" }} />
        </IconButton>
        <Popper
          open={open}
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
              <Paper sx={{ padding: "1.5rem 6rem" }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuList onClick={() => setOpen(false)}>
                      <StyledMenuItem
                        selected={selectedIndex === 1}
                        component={Link}
                        to="/"
                        onClick={(event) => handleMenuItemClick(event, 1)}
                      >
                        Accueil
                      </StyledMenuItem>
                      {isLogged && userRole === "brewer" && (
                        <StyledMenuItem
                          selected={selectedIndex === 2}
                          component={Link}
                          to="/breweries"
                          onClick={(event) => handleMenuItemClick(event, 2)}
                        >
                          Mes brasseries
                        </StyledMenuItem>
                      )}
                      {isLogged && (
                        <StyledMenuItem
                          selected={selectedIndex === 3}
                          component={Link}
                          to="/events"
                          onClick={(event) => handleMenuItemClick(event, 3)}
                        >
                          Evenements
                        </StyledMenuItem>
                      )}
                      {isLogged && (
                        <StyledMenuItem
                          selected={selectedIndex === 4}
                          component={Link}
                          to="/profil"
                          onClick={(event) => handleMenuItemClick(event, 4)}
                        >
                          Profil
                        </StyledMenuItem>
                      )}
                      {!isLogged && (
                        <StyledMenuItem
                          selected={selectedIndex === 5}
                          component={Link}
                          to="/Login"
                          onClick={(event) => handleMenuItemClick(event, 5)}
                        >
                          Connexion
                        </StyledMenuItem>
                      )}
                      {isLogged && (
                        <StyledMenuItem component={Link} onClick={handleLogout}>
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
    </Stack>
  );
};

export default AppMenu;
