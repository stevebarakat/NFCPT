/* eslint-disable react/no-unknown-property */
import { useState, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Link from "next/link";
import Hamburger from "hamburger-react";
import { FaCaretDown } from "react-icons/fa";
import Image from "next/image";
import logo from "../images/logo.svg";
import mobileLogo from "../images/mobile-logo.svg";

const PRIMARY_MENU = gql`
  query GetPrimaryMenu {
    menuItems(where: { location: PRIMARY }) {
      nodes {
        path
        label
        id
        childItems {
          nodes {
            id
            path
            label
          }
        }
      }
    }
  }
`;

const Menu = ({ item, handleSetMobileOpen }) => {
  const ref = useRef();
  const [isActive, setIsActive] = useState(false);
  const dropdownButton = item.childItems.nodes;
  const isDropdownButton = dropdownButton.length > 0;

  useOnClickOutside(ref, () => setIsActive(false));

  const primaryMenu = (
    <li ref={ref}>
      {!isDropdownButton ? (
        <>
          <Link href={item.path} passHref>
            <a className="link">{item.label}</a>
          </Link>
        </>
      ) : (
        <button
          className="link"
          onClick={() => {
            setIsActive((isActive) => !isActive);
          }}
        >
          {item.label}
          <FaCaretDown />
        </button>
      )}

      {item.childItems.nodes.length > 0 && (
        <ul
          className={isActive ? "dropdown" : "dropdown sr-only"}
          // style={isActive ? { display: "block" } : { display: "none" }}
        >
          {item.childItems.nodes.map((item) => {
            return (
              <li key={item.id} className="dropdown-item">
                <Link href={item.path} passHref>
                  <a
                    onPointerUp={() => handleSetMobileOpen(false)}
                    className="link"
                  >
                    {item.label}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <style jsx>{`
        .link {
          background: none;
          border: none;
          font-size: inherit;
          font-family: inherit;
          color: white;
          text-decoration: none;
          display: block;
          width: 100%;
          padding: 1rem;
          line-height: 2.5;
          text-align: left;
        }
        .link {
          border-right: 1px solid white;
        }
        .link a {
          color: white;
        }
        .dropdown {
          background: var(--darkColor);
          position: absolute;
          border-top: 1px solid white;
          border-left: 1px solid white;
        }
        .dropdown-item {
          border-bottom: 1px solid white;
        }
        @media (max-width: 875px) {
          .link {
            border-bottom: 1px solid white;
            border-right: none;
          }
          .dropdown {
            position: relative;
            border: none;
          }
          .dropdown-item {
            border-bottom: none;
          }
        }
      `}</style>
    </li>
  );
  return <>{primaryMenu}</>;
};

export default function Header() {
  const { loading, error, data } = useQuery(PRIMARY_MENU);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleSetMobileOpen = (val) => setMobileOpen(val);
  if (loading) return <div className="loader"></div>;
  if (error) return <p>Error: {error.message} </p>;

  const menuItems = data?.menuItems.nodes;
  return (
    <>
      <span className="hidden">Open main menu</span>
      <div
        className="toggle-mobile-btn"
        onPointerUp={() => setMobileOpen((mobileOpen) => !mobileOpen)}
      >
        <Hamburger label="toggle menu" toggled={mobileOpen} size={20} />
      </div>
      <nav
        className="nav"
        style={{
          "--toggleMobile": mobileOpen ? "translateX(0)" : " translateX(-100%)",
        }}
      >
        <div className="nav-container">
          <div className="logo">
            <Link href="/" passHref>
              <a>
                <Image
                  priority
                  layout="fixed"
                  width="200"
                  src={logo}
                  quality="100"
                  alt="North Florida Chiropractic Physical Therapy"
                />
              </a>
            </Link>
          </div>
          <div>
            <ul className="menu">
              {menuItems.map((item) => (
                <Menu
                  handleSetMobileOpen={handleSetMobileOpen}
                  key={item.id}
                  item={item}
                />
              ))}
            </ul>
          </div>
          <div className="link">
            <a href="tel:904-272-4329">(904) 272-4329</a>
          </div>
        </div>
      </nav>
      <Link href="/" passHref>
        <a style={{ position: "absolute", zIndex: "9", left: "1rem" }}>
          <Image
            layout="fixed"
            width="200"
            src={mobileLogo}
            quality="100"
            alt="North Florida Chiropractic Physical Therapy"
          />
        </a>
      </Link>
      <style jsx>{`
        .nav {
          display: flex;
          justify-content: space-between;
          background: var(--darkColor);
          width: 100%;
          z-index: 20;
          position: absolute;
          border-top: 1px solid white;
          border-bottom: 1px solid white;
          transition: transform 0.25s;
          font-size: 1.25rem;
          padding-left: 0.5rem;
        }
        .nav-container {
          display: flex;
          max-width: 100%;
          width: 1350px;
          justify-content: space-between;
          margin: 0 auto;
          align-items: center;
        }
        .menu {
          display: flex;
          justify-content: center;
          border-left: 1px solid white;
        }
        .toggle-mobile-btn {
          display: none;
        }
        .logo {
          padding-top: 0.5rem;
        }
        .link {
          background: none;
          border: none;
          font-size: inherit;
          font-family: inherit;
          color: white;
          text-decoration: none;
          padding: 1rem;
          line-height: 2.5;
          text-align: left;
        }
        .link a {
          text-decoration: none;
          color: white;
          font-weight: bold;
        }
        @media (max-width: 875px) {
          .link {
            border-bottom: 1px solid white;
          }
          .nav {
            z-index: 99;
            position: fixed;
            flex-direction: column;
            min-height: 100vh;
            transform: var(--toggleMobile);
            text-align: left;
            justify-content: flex-start;
          }
          .nav-container {
            display: block;
          }
          .menu {
            flex-direction: column;
            border-left: none;
            border-top: 1px solid white;
          }
          .toggle-mobile-btn {
            color: white;
            z-index: 55555;
            margin: 1rem;
            position: fixed;
            right: 0;
            border: none;
            background: var(--darkColor);
            display: block;
          }
        }
      `}</style>
    </>
  );
}
