import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {
  FiBell,
  FiBookmark,
  FiFileText,
  FiHelpCircle,
  FiSettings,
  FiLogIn,
  FiEdit2,
  FiLogOut,
  FiArrowLeft,
  FiKey,
  FiStar, 
} from "react-icons/fi";
import { getMe, updateMe, deleteMe, changePassword } from "../services/userservice";
import { getSavedJobIds } from "../services/savedJobService";
import { getNotifications } from "../services/notificationService"; // ✅ NEW
import "./Header.css";

const navItems = [
  { label: "Find Job", path: "/" },
  { label: "Internships", path: "/internships" },
  { label: "Companies", path: "/companies" },
  { label: "Employer Login", path: "/employer/login" },
  { label: "About Us", path: "/about" },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef(null);
  const itemRefs = useRef([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const [profileOpen, setProfileOpen] = useState(false);
  const [profileView, setProfileView] = useState("view");
  const profileWrapRef = useRef(null);

  const [settingsView, setSettingsView] = useState("menu");

  const [passForm, setPassForm] = useState({ oldPassword: "", newPassword: "" });
  const [passLoading, setPassLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [editForm, setEditForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const [savedCount, setSavedCount] = useState(0);

  const [notifCount, setNotifCount] = useState(0);

  const updateUnderline = (index) => {
    const el = itemRefs.current[index];
    const menuEl = menuRef.current;
    if (!el || !menuEl) return;

    const itemRect = el.getBoundingClientRect();
    const menuRect = menuEl.getBoundingClientRect();

    setUnderline({
      left: itemRect.left - menuRect.left,
      width: itemRect.width,
    });
  };

  useEffect(() => {
    const idx = navItems.findIndex((n) => n.path === location.pathname);
    if (idx >= 0) setActiveIndex(idx);
  }, [location.pathname]);

  useEffect(() => {
    updateUnderline(activeIndex);
    const onResize = () => updateUnderline(activeIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "token") setToken(localStorage.getItem("token"));
    };

    const onAuthChanged = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChanged", onAuthChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChanged", onAuthChanged);
    };
  }, []);

  useEffect(() => {
    const onMouseDown = (e) => {
      if (!profileOpen) return;
      const wrap = profileWrapRef.current;
      if (wrap && !wrap.contains(e.target)) {
        setProfileOpen(false);
        setProfileView("view");
        setSettingsView("menu");
      }
    };

    const onKeyDown = (e) => {
      if (!profileOpen) return;
      if (e.key === "Escape") {
        setProfileOpen(false);
        setProfileView("view");
        setSettingsView("menu");
      }
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [profileOpen]);

  const loadSavedCount = async () => {
    const t = localStorage.getItem("token");
    if (!t) {
      setSavedCount(0);
      return;
    }
    try {
      const ids = await getSavedJobIds();
      setSavedCount(Array.isArray(ids) ? ids.length : 0);
    } catch {
      setSavedCount(0);
    }
  };

  const loadNotifCount = async () => {
    const t = localStorage.getItem("token");
    if (!t) {
      setNotifCount(0);
      return;
    }
    try {
      const list = await getNotifications();
      const unread = Array.isArray(list) ? list.filter((n) => !n.readFlag).length : 0;
      setNotifCount(unread);
    } catch {
      setNotifCount(0);
    }
  };

  const fetchMe = async () => {
    const t = localStorage.getItem("token");
    setToken(t);
    if (!t) {
      setUser(null);
      setSavedCount(0);
      setNotifCount(0);
      return;
    }
    try {
      const data = await getMe();
      setUser(data);
      await loadSavedCount();
      await loadNotifCount();
    } catch {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      setSavedCount(0);
      setNotifCount(0);
    }
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
      setSavedCount(0);
      setNotifCount(0);
      return;
    }
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const onSavedChanged = () => loadSavedCount();
    window.addEventListener("savedJobsChanged", onSavedChanged);
    return () => window.removeEventListener("savedJobsChanged", onSavedChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onNotifChanged = () => loadNotifCount();
    window.addEventListener("notificationsChanged", onNotifChanged);
    return () => window.removeEventListener("notificationsChanged", onNotifChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayName = user?.name?.trim() ? user.name.trim() : "";

  const toggleProfile = async () => {
    setProfileOpen((prev) => !prev);
    setProfileView("view");
    setSettingsView("menu");

    const t = localStorage.getItem("token");
    if (t && !user) {
      await fetchMe();
    } else if (t) {
      await loadSavedCount();
      await loadNotifCount();
    }
  };

  const doLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setSavedCount(0);
    setNotifCount(0);
    setProfileOpen(false);
    setProfileView("view");
    setSettingsView("menu");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  const openEdit = () => {
    if (!user) return;
    setEditForm({
      name: user?.name ?? "",
      surname: user?.surname ?? "",
      age: user?.age ?? "",
      phone: user?.phone ?? "",
      location: user?.location ?? "",
      resume: user?.resume ?? "",
      jobProfile: user?.jobProfile ?? "",
      skills: user?.skills ?? "",
      education: user?.education ?? "",
      experience: user?.experience ?? "",
      profileImage: user?.profileImage ?? "",
    });
    setProfileView("edit");
  };

  const cancelEdit = () => {
    setProfileView("view");
  };

  const saveEdit = async () => {
    if (!editForm) return;
    setSaving(true);
    try {
      await updateMe({
        ...editForm,
        age: editForm.age === "" ? null : Number(editForm.age),
        experience: editForm.experience === "" ? null : Number(editForm.experience),
      });
      await fetchMe();
      setProfileView("view");
    } catch (e) {
      alert("Update failed. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const ok = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!ok) return;

    try {
      await deleteMe();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
      setSavedCount(0);
      setNotifCount(0);
      setProfileOpen(false);
      setProfileView("view");
      setSettingsView("menu");
      window.dispatchEvent(new Event("authChanged"));
      navigate("/");
    } catch (e) {
      alert("Account delete failed. Try again.");
    }
  };

  const openChangePassword = () => {
    setPassForm({ oldPassword: "", newPassword: "" });
    setSettingsView("changePassword");
  };

  const cancelChangePassword = () => {
    setPassForm({ oldPassword: "", newPassword: "" });
    setSettingsView("menu");
  };

  const handleChangePassword = async () => {
    if (!passForm.oldPassword || !passForm.newPassword) {
      alert("Please fill old and new password");
      return;
    }

    setPassLoading(true);
    try {
      await changePassword(passForm);
      setPassForm({ oldPassword: "", newPassword: "" });
      alert("Password updated successfully");
      setSettingsView("menu");
    } catch (e) {
      alert("Old password incorrect or update failed");
    } finally {
      setPassLoading(false);
    }
  };

  const go = (path) => {
    setProfileOpen(false);
    setProfileView("view");
    setSettingsView("menu");
    navigate(path);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo" onClick={() => navigate("/")}>
            <span className="logo-normal">Hire</span>
            <span className="logo-accent">Now.</span>
          </div>

          <ul className="navbar-menu" ref={menuRef}>
            {navItems.map((item, idx) => (
              <li
                key={item.label}
                ref={(el) => (itemRefs.current[idx] = el)}
                className={`navbar-item ${activeIndex === idx ? "active" : ""}`}
                onClick={() => {
                  setActiveIndex(idx);
                  navigate(item.path);
                }}
                onMouseEnter={() => updateUnderline(idx)}
                onMouseLeave={() => updateUnderline(activeIndex)}
              >
                {item.label}
              </li>
            ))}
            <span className="navbar-underline" style={{ left: underline.left, width: underline.width }} />
          </ul>

          <div className="navbar-icons" ref={profileWrapRef}>
            <button
              className="profile-btn"
              onClick={toggleProfile}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              title="Profile"
            >
              <span className="nav-hi">{user?.name?.trim() ? `Hi, ${displayName}` : ""}</span>

              {user && (
                <span
                  className="nav-bell"
                  title="Notifications"
                  onClick={(e) => {
                    e.stopPropagation();
                    go("/notifications");
                  }}
                >
                  <FiBell className="icon" />
                  {notifCount > 0 && <span className="notifBadge">{notifCount}</span>}
                </span>
              )}

              {user?.profileImage ? (
                <img className="nav-avatar" src={user.profileImage} alt="profile" />
              ) : (
                <FaUserCircle className="icon" />
              )}
            </button>

            {profileOpen && (
              <>
                <div className="profile-overlay" />
                <div className="profile-menu premium" role="menu">
                  {!user ? (
                    <div className="pm-top">
                      <div className="pm-hello">
                        <div className="pm-title">Hey 👋</div>
                        <div className="pm-sub">Login to apply & save jobs</div>
                      </div>

                      <button
                        className="pm-login"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/login");
                        }}
                      >
                        <FiLogIn className="pm-ic" />
                        Login / Register
                      </button>

                      {/* ✅ NEW: Upgrade to Premium (guest) */}
                      <button
                        className="pm-login pm-premium"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/login");
                        }}
                      >
                        <FiStar className="pm-ic" />
                        Upgrade to Premium
                      </button>

                      <div className="pm-section">
                        <button className="pm-item" role="menuitem" onClick={() => go("/notifications")}>
                          <span className="pm-left">
                            <FiBell /> Notifications
                          </span>
                          <span className="pm-right">›</span>
                        </button>

                        <button className="pm-item disabled" role="menuitem" disabled>
                          <span className="pm-left">
                            <FiFileText /> Your Applications
                          </span>
                          <span className="pm-right">🔒</span>
                        </button>

                        <button className="pm-item disabled" role="menuitem" disabled>
                          <span className="pm-left">
                            <FiBookmark /> Saved Jobs
                          </span>
                          <span className="pm-right">🔒</span>
                        </button>
                      </div>

                      <div className="pm-divider" />

                      <div className="pm-section">
                        <button className="pm-item" role="menuitem">
                          <span className="pm-left">
                            <FiHelpCircle /> Help & Support
                          </span>
                          <span className="pm-right">›</span>
                        </button>

                        <button className="pm-item" role="menuitem">
                          <span className="pm-left">
                            <FiSettings /> Settings
                          </span>
                          <span className="pm-right">›</span>
                        </button>
                      </div>

                      <div className="pm-footer">
                        <div className="pm-footText">HireNow • Secure profile</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {profileView === "view" && (
                        <div className="pm-top pm-top-user">
                          <div className="pm-userRow">
                            {user.profileImage ? (
                              <img className="pm-avatar" src={user.profileImage} alt="profile" />
                            ) : (
                              <div className="pm-avatar-fallback">
                                {(displayName || "U").slice(0, 1).toUpperCase()}
                              </div>
                            )}

                            <div className="pm-userMeta">
                              <div className="pm-userName">{displayName}</div>
                              <div className="pm-userSub">{user.email}</div>
                            </div>
                          </div>

                          <button className="pm-edit" onClick={openEdit}>
                            <FiEdit2 /> Edit Profile
                          </button>

                          <div className="pm-section">
                            <button className="pm-item" role="menuitem" onClick={() => go("/notifications")}>
                              <span className="pm-left">
                                <FiBell /> Notifications
                                {notifCount > 0 && <span className="savedBadge">{notifCount}</span>}
                              </span>
                              <span className="pm-right">›</span>
                            </button>

                            <button className="pm-item" role="menuitem" onClick={() => go("/my-applications")}>
                              <span className="pm-left">
                                <FiFileText /> Your Applications
                              </span>
                              <span className="pm-right">›</span>
                            </button>

                            <button className="pm-item" role="menuitem" onClick={() => go("/saved-jobs")}>
                              <span className="pm-left">
                                <FiBookmark /> Saved Jobs
                                {savedCount > 0 && <span className="savedBadge">{savedCount}</span>}
                              </span>
                              <span className="pm-right">›</span>
                            </button>

                            {/* ✅ NEW: Subscription button (logged-in) */}
                            <button className="pm-item" role="menuitem" onClick={() => go("/subscription")}>
                              <span className="pm-left">
                                <FiStar /> Subscription
                              </span>
                              <span className="pm-right">›</span>
                            </button>
                          </div>

                          <div className="pm-divider" />

                          <div className="pm-section">
                            <button className="pm-item" role="menuitem">
                              <span className="pm-left">
                                <FiHelpCircle /> Help & Support
                              </span>
                              <span className="pm-right">›</span>
                            </button>

                            <button
                              className="pm-item"
                              role="menuitem"
                              onClick={() => {
                                setProfileView("settings");
                                setSettingsView("menu");
                              }}
                            >
                              <span className="pm-left">
                                <FiSettings /> Settings
                              </span>
                              <span className="pm-right">›</span>
                            </button>

                            <button className="pm-item danger" role="menuitem" onClick={doLogout}>
                              <span className="pm-left">
                                <FiLogOut /> Logout
                              </span>
                              <span className="pm-right">›</span>
                            </button>
                          </div>

                          <div className="pm-footer">
                            <div className="pm-footText">HireNow • Secure profile</div>
                          </div>
                        </div>
                      )}

                      {profileView === "settings" && (
                        <div className="pm-top">
                          <div className="pm-editTop">
                            <button
                              className="pm-back"
                              onClick={() => {
                                setProfileView("view");
                                setSettingsView("menu");
                              }}
                              aria-label="Back"
                            >
                              <FiArrowLeft />
                            </button>
                            <div className="pm-editTitle">Settings</div>
                          </div>

                          {settingsView === "menu" && (
                            <>
                              <div className="pm-section">
                                <button className="pm-item" role="menuitem" onClick={openChangePassword}>
                                  <span className="pm-left">
                                    <FiKey /> Change Password
                                  </span>
                                  <span className="pm-right">›</span>
                                </button>
                              </div>

                              <div className="pm-section">
                                <button className="pm-item danger" role="menuitem" onClick={handleDeleteAccount}>
                                  <span className="pm-left">
                                    <FiLogOut /> Delete Account
                                  </span>
                                  <span className="pm-right">›</span>
                                </button>
                              </div>

                              <div className="pm-footer">
                                <div className="pm-footText">This action is irreversible</div>
                              </div>
                            </>
                          )}

                          {settingsView === "changePassword" && (
                            <>
                              <div className="pm-editCard">
                                <div className="pm-userName" style={{ marginBottom: 10 }}>
                                  Change Password
                                </div>

                                <div className="pm-editGrid">
                                  <input
                                    type="password"
                                    value={passForm.oldPassword}
                                    onChange={(e) => setPassForm({ ...passForm, oldPassword: e.target.value })}
                                    placeholder="Old Password"
                                  />
                                  <input
                                    type="password"
                                    value={passForm.newPassword}
                                    onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                                    placeholder="New Password"
                                  />
                                </div>

                                <div className="pm-editActions">
                                  <button className="btnGhost" onClick={cancelChangePassword}>
                                    Cancel
                                  </button>
                                  <button className="btnPrimary" onClick={handleChangePassword} disabled={passLoading}>
                                    {passLoading ? "Updating..." : "Update Password"}
                                  </button>
                                </div>
                              </div>

                              <div className="pm-footer">
                                <div className="pm-footText">Go back anytime</div>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {profileView === "edit" && editForm && (
                        <div className="pm-top">
                          <div className="pm-editTop">
                            <button className="pm-back" onClick={cancelEdit} aria-label="Back">
                              <FiArrowLeft />
                            </button>
                            <div className="pm-editTitle">Edit Profile</div>
                          </div>

                          <div className="pm-editCard">
                            <div className="pm-editGrid">
                              <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" />
                              <input value={editForm.surname} onChange={(e) => setEditForm({ ...editForm, surname: e.target.value })} placeholder="Surname" />
                              <input value={editForm.age} onChange={(e) => setEditForm({ ...editForm, age: e.target.value })} placeholder="Age" />
                              <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} placeholder="Phone" />
                              <input value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} placeholder="Location" />
                              <input value={editForm.jobProfile} onChange={(e) => setEditForm({ ...editForm, jobProfile: e.target.value })} placeholder="Job Profile" />
                              <input value={editForm.skills} onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })} placeholder="Skills" />
                              <input value={editForm.education} onChange={(e) => setEditForm({ ...editForm, education: e.target.value })} placeholder="Education" />
                              <input value={editForm.experience} onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })} placeholder="Experience" />
                              <input className="long" value={editForm.resume} onChange={(e) => setEditForm({ ...editForm, resume: e.target.value })} placeholder="Resume URL" />
                              <input className="long" value={editForm.profileImage} onChange={(e) => setEditForm({ ...editForm, profileImage: e.target.value })} placeholder="Profile Image URL" />
                            </div>

                            <div className="pm-editActions">
                              <button className="btnGhost" onClick={cancelEdit}>
                                Cancel
                              </button>
                              <button className="btnPrimary" onClick={saveEdit} disabled={saving}>
                                {saving ? "Saving..." : "Save"}
                              </button>
                            </div>
                          </div>

                          <div className="pm-footer">
                            <div className="pm-footText">HireNow • Secure profile</div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
