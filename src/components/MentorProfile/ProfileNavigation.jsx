import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const drawerWidth = 240;

const sections = [
  {
    id: "personal",
    label: "Personal Information",
    icon: "bi-person-lines-fill",
  },
  {
    id: "meetings",
    label: "Meetings",
    icon: "bi-calendar-event",
    subSections: [
      { id: "upcoming", label: "Upcoming", icon: "bi-calendar-plus" },
      { id: "previous", label: "Previous", icon: "bi-calendar-check" },
      { id: "recordings", label: "Recordings", icon: "bi-camera-video" },
    ],
  },
  { id: "schedule", label: "Schedule", icon: "bi-calendar-week" },
  { id: "joinRoom", label: "Join Room", icon: "bi-camera-video" },
  { id: "changePassword", label: "Change Password", icon: "bi-lock" },
  { id: "settings", label: "Settings", icon: "bi-gear" },
];

const ProfileNavigation = ({ activeSection, setActiveSection }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isBelow800px = useMediaQuery("(max-width:800px)");
  const [open, setOpen] = useState(!isBelow800px);
  const [expandedSection, setExpandedSection] = useState(null);

  // Update drawer state when screen size changes
  useEffect(() => {
    setOpen(!isBelow800px);
  }, [isBelow800px]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSectionClick = (sectionId) => {
    if (sectionId === "meetings") {
      setExpandedSection(expandedSection === "meetings" ? null : "meetings");
    } else {
      setActiveSection(sectionId);
    }
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? (isMobile ? 180 : drawerWidth) : 60,
        flexShrink: 0,
        display: "block",
        float: "left",
        height: "100%",
        overflow: "auto",
        zIndex: "1",
        "& .MuiDrawer-paper": {
          width: open ? (isMobile ? 180 : drawerWidth) : 60,
          boxSizing: "border-box",
          transition: "width 0.3s",
          position: "absolute",
          top: "0",
          bottom: "0",
          height: "100%",
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
          backgroundColor: "#f8f9fa",
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: "48px !important",
          backgroundColor: "#198754",
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 8px",
        }}
      >
        <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
          {open ? (
            <i className="bi bi-chevron-left"></i>
          ) : (
            <i className="bi bi-list"></i>
          )}
        </IconButton>
      </Toolbar>
      <List>
        {sections.map((section) => (
          <React.Fragment key={section.id}>
            <ListItem disablePadding>
              <ListItemButton
                selected={
                  activeSection === section.id || expandedSection === section.id
                }
                onClick={() => handleSectionClick(section.id)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#e8f5e9",
                    borderLeft: "4px solid #198754",
                    "&:hover": {
                      backgroundColor: "#333433",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "#cad0ca",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      activeSection === section.id ||
                      expandedSection === section.id
                        ? "#198754"
                        : "#757575",
                    minWidth: "40px",
                  }}
                >
                  <i className={`bi ${section.icon} fs-5`}></i>
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={section.label}
                    sx={{
                      "& .MuiTypography-root": {
                        fontWeight:
                          activeSection === section.id ||
                          expandedSection === section.id
                            ? "bold"
                            : "normal",
                        color:
                          activeSection === section.id ||
                          expandedSection === section.id
                            ? "#198754"
                            : "#424242",
                      },
                    }}
                  />
                )}
                {open && section.subSections && (
                  <i
                    className={`bi ${
                      expandedSection === section.id
                        ? "bi-chevron-down"
                        : "bi-chevron-right"
                    }`}
                  ></i>
                )}
              </ListItemButton>
            </ListItem>

            {section.subSections && (
              <Collapse
                in={expandedSection === section.id && open}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {section.subSections.map((subSection) => (
                    <ListItemButton
                      key={subSection.id}
                      selected={activeSection === subSection.id}
                      onClick={() => setActiveSection(subSection.id)}
                      sx={{
                        pl: 4,
                        "&.Mui-selected": {
                          backgroundColor: "#e8f5e9",
                          borderLeft: "4px solid #198754",
                          "&:hover": {
                            backgroundColor: "#333433",
                          },
                        },
                        "&:hover": {
                          backgroundColor: "#cad0ca",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                            activeSection === subSection.id
                              ? "#198754"
                              : "#757575",
                          minWidth: "40px",
                        }}
                      >
                        <i className={`bi ${subSection.icon} fs-5`}></i>
                      </ListItemIcon>
                      <ListItemText
                        primary={subSection.label}
                        sx={{
                          "& .MuiTypography-root": {
                            fontWeight:
                              activeSection === subSection.id
                                ? "bold"
                                : "normal",
                            color:
                              activeSection === subSection.id
                                ? "#198754"
                                : "#424242",
                          },
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default ProfileNavigation;
