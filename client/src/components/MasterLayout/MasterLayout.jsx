import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineLogout,
  AiOutlineMenuUnfold,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsHourglass, BsListNested } from 'react-icons/bs';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { RiDashboardLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

const MasterLayout = (props) => {
  const [open, setOpen] = useState(true);

  const onLogout = () => {};

  return (
    <>
      <Navbar className="fixed-top px-0 shadow-sm">
        <Container fluid={true}>
          <Navbar.Brand>
            <a
              className="icon-nav m-0 h5"
              onClick={() => setOpen((prev) => !prev)}
            >
              <AiOutlineMenuUnfold />
            </a>
            <img className="nav-logo mx-2" src={logo} alt="logo" />
          </Navbar.Brand>

          <div className="float-right h-auto d-flex">
            <div className="user-dropdown">
              <img className="icon-nav-img icon-nav" src="" />
              <div className="user-dropdown-content">
                <div className="mt-4 text-center">
                  <img className="icon-nav-img" src="" />
                  <hr className="user-dropdown-divider p-0" />
                </div>
                <NavLink to="/Profile" className="side-bar-item">
                  <AiOutlineUser className="side-bar-icon" />
                  <span className="side-bar-item-caption">Profile</span>
                </NavLink>
                <a onClick={onLogout} className="side-bar-item">
                  <AiOutlineLogout className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>

      <div className={open ? 'side-nav-open' : 'side-nav-close'}>
        <NavLink
          className={(navData) =>
            navData.isActive
              ? 'side-bar-item-active side-bar-item mt-2'
              : 'side-bar-item mt-2'
          }
          to="/"
          end
        >
          <RiDashboardLine className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Dashboard</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? 'side-bar-item-active side-bar-item mt-2'
              : 'side-bar-item mt-2'
          }
          to="/Create"
        >
          <AiOutlineEdit className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Create New</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? 'side-bar-item-active side-bar-item mt-2'
              : 'side-bar-item mt-2'
          }
          to="/New"
        >
          <BsListNested className="side-bar-item-icon" />
          <span className="side-bar-item-caption">New Task</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? 'side-bar-item-active side-bar-item mt-2'
              : 'side-bar-item mt-2'
          }
          to="/Progress"
        >
          <BsHourglass className="side-bar-item-icon" />
          <span className="side-bar-item-caption">In Progress</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? 'side-bar-item-active side-bar-item mt-2'
              : 'side-bar-item mt-2'
          }
          to="/Completed"
        >
          <AiOutlineCheckCircle className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Completed</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? 'side-bar-item-active side-bar-item mt-2'
              : 'side-bar-item mt-2'
          }
          to="/Cancelled"
        >
          <MdOutlineCancelPresentation className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Cancelled</span>
        </NavLink>
      </div>

      <div className={open ? 'content' : 'content-expand'}>
        {props.children}
      </div>
    </>
  );
};

export default MasterLayout;
