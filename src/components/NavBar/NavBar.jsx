import axios from "axios";
import "./NavBar.css";
import React, { useState,useEffect ,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { logout } from "../../rtk/features/authSlice";
import { markNotificationRead } from "../../rtk/features/notificationSlice";
// Material UI imports
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Drawer,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EventIcon from "@mui/icons-material/Event";
import EmailIcon from "@mui/icons-material/Email";

function NavBar() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);

  // New state for Material UI components
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const unreadNotifications = notifications?.reduce((count, notify) => {
    return notify.isRead === false ? count + 1 : count;
  }, 0);

  // Handle menu openings
  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const fetchSearch = async (value) => {
    const res = await axios.post(
      `http://localhost:3000/api/v1/mentors/search`,
      { name: value }
    );
    return res.data;
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    const mentors = await fetchSearch(e.target.value);
    setSearchResult(mentors.data);
    setSearch("");
  };

  async function handleLogout() {
    dispatch(logout());
    handleProfileMenuClose();
  }
  const searchResultRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultRef.current &&
        !searchResultRef.current.contains(event.target)
      ) {
        setSearchResult([]);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ backgroundColor: "white" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo */}
          <Typography
            variant="h5"
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              mr: 2,
            }}
          >
            <Box component="span" sx={{ color: "#118577", fontWeight: "bold" }}>
              Mentor
            </Box>
            <Box
              component="span"
              sx={{ color: "#172E59", fontWeight: "medium" }}
            >
              Ship
            </Box>
          </Typography>

          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" }, color: "#172E59" }}
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile search */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", lg: "none" },
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: 1,
              }}
            >
              <IconButton sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search..."
                onChange={handleSearch}
                sx={{ ml: 1, flex: 1 }}
              />
            </Box>

            {searchResult.length > 0 && (
              <Paper
              ref={searchResultRef}
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  mt: 1,
                  p: 2,
                  maxHeight: 500,
                  overflowY: "auto",
                }}
              >
                {searchResult.map((mentor) => (
                  <Box
                    key={mentor._id}
                    component={Link}
                    to={`mentorprofile/${mentor._id}`}
                    onClick={() => setSearchResult([])}
                    sx={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      borderRadius: 1,
                      "&:hover": { bgcolor: "#f5f5f5" },
                      mb: 1,
                    }}
                  >
                    <Avatar
                      src={`http://localhost:3000/img/users/${mentor.image}`}
                      alt={mentor.name}
                      sx={{ mr: 2, width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" color="textPrimary">
                        {mentor.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {mentor.title}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>
            )}
          </Box>

          {/* Desktop search */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "400px",
                border: "1px solid #ddd",
                borderRadius: 1,
              }}
            >
              <IconButton sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search for mentors..."
                onChange={handleSearch}
                sx={{ ml: 1, flex: 1 }}
              />
            </Box>

            {searchResult.length > 0 && (
              <Paper
              ref={searchResultRef}
                sx={{
                  
                  position: "absolute",
                  top: "100%",
                  width: "400px",
                  zIndex: 1000,
                  mt: 1,
                  p: 2,
                  maxHeight: 500,
                  overflowY: "auto",
                }}
              >
                {searchResult.map((mentor) => (
                  <Box
                    key={mentor._id}
                    component={Link}
                    to={`mentorprofile/${mentor._id}`}
                    onClick={() => setSearchResult([])}
                    sx={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      borderRadius: 1,
                      "&:hover": { bgcolor: "#f5f5f5" },
                      mb: 1,
                    }}
                  >
                    <Avatar
                      src={`http://localhost:3000/img/users/${mentor.image}`}
                      alt={mentor.name}
                      sx={{ mr: 2, width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" color="textPrimary">
                        {mentor.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {mentor.title}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>
            )}
          </Box>

          {/* Navigation items */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              component={NavLink}
              to="/mentors"
              variant="contained"
              startIcon={<GroupIcon />}
              sx={{
                mr: 2,
                bgcolor: "#118577",
                
                "&:hover": { bgcolor: "#0d6e63" },
                display: { xs: "none", md: "flex" },
              }}
            >
              Browse all mentors
            </Button>

            {user ? (
              <>
                {/* Notifications */}
                <IconButton
                  color="inherit"
                  onClick={handleNotificationMenuOpen}
                  sx={{ mr: 1 }}
                >
                  <Badge badgeContent={unreadNotifications} color="error">
                    <NotificationsIcon sx={{ color: "#172E59" }} />
                  </Badge>
                </IconButton>
                <Menu
                  anchorEl={notificationAnchorEl}
                  open={Boolean(notificationAnchorEl)}
                  onClose={handleNotificationMenuClose}
                  PaperProps={{
                    sx: { width: 320, maxHeight: 500 },
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "#f5f5f5",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <Typography variant="subtitle1">Notifications</Typography>
                    <Typography variant="body2" color="textSecondary">
                      You have {unreadNotifications} unread notifications
                    </Typography>
                  </Box>

                  <Box sx={{ maxHeight: 350, overflow: "auto" }}>
                    {notifications.length === 0 ? (
                      <Typography
                        sx={{
                          textAlign: "center",
                          py: 3,
                          color: "text.secondary",
                        }}
                      >
                        No notifications
                      </Typography>
                    ) : (
                      [...notifications]?.reverse().map((notify) => (
                        <React.Fragment key={notify._id}>
                          <Box
                            sx={{
                              display: "flex",
                              p: 2,
                              bgcolor: !notify.isRead
                                ? "#f5f5f5"
                                : "transparent",
                            }}
                          >
                            <Checkbox
                              checked={notify.isRead}
                              onChange={() =>
                                dispatch(markNotificationRead(notify?._id))
                              }
                              sx={{ mr: 1, alignSelf: "flex-start", mt: 0.5 }}
                            />
                            <Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 0.5,
                                }}
                              >
                                {notify?.type === "comment" && (
                                  <CommentIcon color="success" sx={{ mr: 1 }} />
                                )}
                                {notify?.type === "like" && (
                                  <ThumbUpIcon color="primary" sx={{ mr: 1 }} />
                                )}
                                {notify?.type === "booking" && (
                                  <EventIcon color="warning" sx={{ mr: 1 }} />
                                )}
                                {notify?.type === "message" && (
                                  <EmailIcon color="error" sx={{ mr: 1 }} />
                                )}
                                <Typography
                                  variant="caption"
                                  color="textSecondary"
                                  sx={{ ml: "auto" }}
                                >
                                  {new Date(
                                    notify.createdAt
                                  ).toLocaleDateString()}
                                </Typography>
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  lineHeight: 1.4,
                                  maxWidth: 230,
                                  wordWrap: "break-word",
                                  whiteSpace: "normal",
                                }}
                              >
                                {notify?.message}
                              </Typography>
                            </Box>
                          </Box>
                          <Divider />
                        </React.Fragment>
                      ))
                    )}
                  </Box>
                </Menu>

                {/* User profile */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ mr: 1, display: { xs: "none", md: "block" } }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 ,color:"#172E59"}}>
                      {user?.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {/* {user?.role} */}
                    </Typography>
                  </Box>
                  <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                    <Avatar
                      src={`http://localhost:3000/img/users/${user.image}`}
                      alt={user?.name}
                      sx={{ width: 40, height: 40 }}
                    />
                  </IconButton>
                </Box>
                <Menu
                  anchorEl={profileAnchorEl}
                  open={Boolean(profileAnchorEl)}
                  onClose={handleProfileMenuClose}
                  PaperProps={{
                    sx: {     backgroundColor:" white" ,color:"#172E59"},
                  }}
              
                >
                  <MenuItem
                    component={NavLink}
                    to={`/${user.role}`}
                    onClick={handleProfileMenuClose}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#118577',
                        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                          color: '#fff',
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" color="inherit" sx={{ color: "#172E59" }}/>
                    </ListItemIcon>
                    <ListItemText  primary="Dashboard" ></ListItemText>
                  </MenuItem>
                  <MenuItem
                    component={NavLink}
                    to="/community"
                    onClick={handleProfileMenuClose}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#118577',
                        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                          color: '#fff',
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <GroupIcon fontSize="small" color="success" sx={{ color: "#172E59" }} />
                    </ListItemIcon>
                    <ListItemText>Community</ListItemText>
                  </MenuItem>
                  <MenuItem
                    component={NavLink}
                    to={`/community/user/${user?._id}/${user?.role}`}
                    onClick={handleProfileMenuClose}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#118577',
                        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                          color: '#fff',
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" color="info" sx={{ color: "#172E59" }}/>
                    </ListItemIcon>
                    <ListItemText>Community Profile</ListItemText>
                  </MenuItem>
                  <MenuItem
                    component={NavLink}
                    to="/chat"
                    onClick={handleProfileMenuClose}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#118577',
                        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                          color: '#fff',
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <ChatIcon fontSize="small" color="warning"sx={{ color: "#172E59" }} />
                    </ListItemIcon>
                    <ListItemText>Chat</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#118577',
                      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                        color: '#fff',
                      },
                    },
                  }}
                  >
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" color="error" sx={{ color: "#172E59" }}/>
                    </ListItemIcon>
                    <ListItemText sx={{ color: "error.main" }}>
                      Logout
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={NavLink}
                to="/login"
                variant="outlined"
                color="primary"
                startIcon={<ExitToAppIcon />}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h5"
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              mr: 2,
              // Use MUI's built-in breakpoint system
              fontSize: { xs: "1rem", sm: "1.5rem" },
              fontWeight: { xs: "500", sm: "bold" },
            }}
          >
            <Box component="span" sx={{ color: "#118577", fontWeight: "bold" }}>
              Mentor
            </Box>
            <Box
              component="span"
              sx={{ color: "#172E59", fontWeight: "medium" }}
            >
              Ship
            </Box>
          </Typography>

          <Divider sx={{ mb: 2 }} />
          <Button
            component={NavLink}
            to="/mentors"
            variant="contained"
            fullWidth
            startIcon={<GroupIcon />}
            sx={{
              mb: 2,
              bgcolor: "#118577",
              "&:hover": { bgcolor: "#0d6e63" },
            }}
          >
            Browse all mentors
          </Button>
          {user && (
            <List>
              <ListItem button component={NavLink} to={`/${user.role}`}>
                <ListItemIcon>
                  <DashboardIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={NavLink} to="/community">
                <ListItemIcon>
                  <GroupIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Community" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to={`/community/user/${user?._id}/${user?.role}`}
              >
                <ListItemIcon>
                  <AccountCircleIcon color="info" />
                </ListItemIcon>
                <ListItemText primary="Community Profile" />
              </ListItem>
              <ListItem button component={NavLink} to="/chat">
                <ListItemIcon>
                  <ChatIcon color="warning" />
                </ListItemIcon>
                <ListItemText primary="Chat" />
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: "error.main" }} />
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default NavBar;
