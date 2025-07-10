import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/site-logo.png";
import Swal from "sweetalert2";
import DefaultProfile from "/default-profile.png";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/config.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getRole } from "../api/Auth.js";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/RoleContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useLoader } from "../context/LoaderContext.jsx";

//providers for different sign in types
const google_provider = new GoogleAuthProvider();
const github_provider = new GithubAuthProvider();

export const ERR0R_CODE = {
  INVALID_EMAIL: "auth/invalid-email",
  INVALID_CREDENTIALS: "auth/invalid-credential",
};

function Navbar() {
  const [seller, setSeller] = useState(false);
  const { currentUser, setCurrentUser } = useUser();
  const { loading, setLoading } = useLoader();

  const navigate = useNavigate();

  useEffect(() => {
    //*gets if the user is an admin or a user
    if (currentUser) {
      const fetchRole = async () => {
        const role = await getRole(currentUser.accessToken);
        setSeller(role);
      };
      fetchRole();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      if (seller) {
        navigate("/dashboard");
      }
    }
  }, [seller, currentUser]);

  return (
    <div className=" flex justify-between p-4 shadow-lg font-[Poppins]">
      <BrandName />
      <Links />
      <SearchBar />
      <div className="flex gap-10 items-center">
        {currentUser ? (
          <UserProfile
            username={currentUser.email}
            setCurrentUser={setCurrentUser}
            setLoading={setLoading}
          />
        ) : (
          <AccountDrawer setLoading={setLoading} loading={loading} />
        )}

        <CartDrawer />
      </div>
    </div>
  );
}

function BrandName() {
  return (
    <div className="flex items-center gap-2">
      <img src={Logo} className="h-10" alt="" />
      <h1 className="font-bold ">UrbanFlick</h1>
    </div>
  );
}
function Links() {
  return (
    <div className="list-none flex items-center gap-9 font-medium cursor-pointer">
      <li>Home</li>
      <li>T-Shirts</li>
      <li>Pants</li>
      <li>Shoes</li>
    </div>
  );
}

function SearchBar() {
  return (
    <input type="text" placeholder="Search for a product" className="input" />
  );
}

function CartDrawer() {
  const { cart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart.length != 0) {
      const total = cart.reduce((total, current) => {
        return (total += Number(current.price));
      }, 0);

      setTotal(total);
    }
  }, [cart]);

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-primary"
          >
            <i className="fa-solid fa-cart-shopping text-xl"></i>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div
            className="menu bg-base-200 text-base-  content min-h-full  p-4 flex-col justify-between"
            style={{
              width: "25rem",
            }}
          >
            <div className="flex flex-col gap-3 ">
              <h1 className="font-bold text-2xl text-center">My Cart</h1>
              {cart.length == 0 ? (
                <h2 className="font-normal text-xl ml-3">Cart is Empty</h2>
              ) : (
                cart.map((data) => (
                  <CartItem
                    productName={data.productName}
                    image={data.image}
                    quantity={data.quantity}
                  />
                ))
              )}
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center  justify-around w-full">
                <p className="text-xl font-bold">Total</p>
                <p className="text-xl font-medium text-green-500">${total}</p>
              </div>
              <button className="btn btn-dash btn-primary w-40">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountDrawer({ setLoading, loading }) {
  const modalRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, setCurrentUser } = useUser();

  function closeModal() {
    modalRef.current.close();
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  function showModal() {
    modalRef.current.showModal();
  }

  return (
    <div>
      <button className="btn" onClick={() => showModal()}>
        <i className="fa-solid fa-user text-lg"></i>
      </button>
      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => closeModal()}
            >
              ✕
            </button>
          </form>
          <div className="p-3 flex flex-col gap-5">
            <div className="flex justify-center font-[Ubuntu]">
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="font-bold text-2xl text-center">
                  Login
                </legend>

                <label className="font-medium text-lg">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  ref={emailRef}
                />

                <label className="text-lg font-medium">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  ref={passwordRef}
                />

                <button
                  className="btn btn-neutral mt-4"
                  onClick={() => {
                    setLoading(true);
                    signIn(
                      emailRef.current,
                      passwordRef.current,
                      modalRef,
                      setCurrentUser,
                      setLoading
                    );
                  }}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </fieldset>
            </div>
            <div className="flex items-center gap-3 justify-center cursor-pointer">
              <div
                className="flex items-center gap-2"
                onClick={() =>
                  ToggleForm(google_provider, modalRef, setCurrentUser)
                }
              >
                <i className="fa-brands fa-google text-xl"></i>
                <p className="font-bold">Google</p>
              </div>

              <div
                className="flex items-center gap-2"
                onClick={() =>
                  ToggleForm(github_provider, modalRef, setCurrentUser)
                }
              >
                <i className="fa-brands fa-github text-xl"></i>
                <p className="font-bold">Github</p>
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium">Dont have an Account?</p>
              <NavLink to="/register">
                <li className="link link-neutral list-none underline-offset-2">
                  Register
                </li>
              </NavLink>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

function ToggleForm(provider, modalRef, setCurrentUser) {
  signInWithPopup(auth, provider)
    .then((credential) => {
      const user = credential.user;
      const { displayName } = user;
      setCurrentUser(credential.user);
      modalRef.current.close();
      showSuccess(displayName);
      return;
    })
    .catch((error) => {
      console.log(error);
    });
  return null;
}

function signIn(emailRef, passwordRef, modal, setCurrentUser, setLoading) {
  signInWithEmailAndPassword(auth, emailRef.value, passwordRef.value)
    .then((credential) => {
      const user = credential.user;
      const { displayName } = user;
      setLoading(false);
      showSuccess(displayName ? displayName : "User");
      setCurrentUser(credential.user);
      emailRef.value = "";
      passwordRef.value = "";
    })
    .catch((error) => {
      const code = error.code;

      switch (code) {
        case ERR0R_CODE.INVALID_EMAIL:
          showError("Invalid Email", modal);
          break;
        case ERR0R_CODE.INVALID_CREDENTIALS:
          showError("Invalid Credentials", modal);
          break;
      }
    });

  return null;
}

function UserProfile({ username, setCurrentUser, setLoading }) {
  const { setCart } = useCart();

  const handleLogOut = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    //clears the state of cart and signs out user
    auth.signOut();
    setCart([]);
    setCurrentUser("");
  };
  return (
    <div>
      <div className="dropdown ">
        <div tabIndex={0} className="roundex-xl focus:outline-0">
          <img className="h-12" src={DefaultProfile}></img>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-90 p-2 shadow-sm focus:outline-0 "
        >
          <li className="w-full">
            <a onClick={() => handleLogOut()} className="w-full ">
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function CartItem({ image, productName, quantity }) {
  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md mb-2">
        <li className="list-row">
          <section className="flex justify-center gap-5">
            <div>
              <img className="size-10 rounded-box" src={image} />
            </div>
            <div>
              <div className="text-xl">{productName}</div>
            </div>
          </section>
          <div className="flex justify-center">
            <button className="btn btn-square btn-ghost">
              <i class="fa-solid fa-trash text-xl" title="Remove Item"></i>
            </button>
            <button className="btn btn-square btn-ghost">
              <i
                class="fa-solid fa-money-check-dollar text-xl"
                title="Check Out"
              ></i>
            </button>
          </div>
          <div className="flex items-center w-[80%]">
            <QuantityBtn role="add" />
            {quantity}
            <QuantityBtn role="deduct" />
          </div>
        </li>
      </ul>
    </div>
  );
}

function QuantityBtn({ role }) {
  return (
    <button
      className="group cursor-pointer outline-none hover:rotate-90 duration-300 focus:outline-none border-0 "
      title="Add New"
    >
      {role == "add" ? (
        <i class="fa-solid fa-plus focus:outline-0 hover:outline:0"></i>
      ) : (
        <i class="fa-solid fa-minus"></i>
      )}
    </button>
  );
}

export function showSuccess(displayName) {
  Swal.fire({
    icon: "success",
    title: "Logged in!",
    text: `Welcome Back ${displayName} !!`,
  });
}

export function showError(message, modal) {
  modal.current.close();
  Swal.fire({
    icon: "error",
    title: message,
    text: "User was not found please check your email and password",
  }).then((response) => {
    modal.current.showModal();
  });
}

export default Navbar;
