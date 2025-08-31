import { useEffect, useState } from "react";
import DefaultProfile from "../assets/images/default-profile.png";
import { auth } from "../firebase/config";
import { useUser } from "../context/RoleContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState(null);

  //Navigates to base route if there is no user logged in
  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
      setPhoto(currentUser.photoURL);
      return;
    }

    //*Navigates if there is no current user
    navigate("/");
  }, [currentUser]);

  return (
    <div className="font-[Ubuntu]">
      <div className="navbar bg-base-100 shadow-xl">
        <div className="flex w-full gap-5 items-center justify-end">
          <i class="fa-solid fa-bell text-2xl"></i>
          <section className="flex flex-col">
            <h2>{email && email}</h2>
            <p className="self-end text-sm text-gray-400">Seller</p>
          </section>
          <div className="flex-none">
            <div className="dropdown dropdown-end p-3 ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {!photo ? (
                    <img alt="Default User Profile" src={DefaultProfile} />
                  ) : (
                    <img
                      alt="User Profile"
                      src={currentUser && currentUser.photoURL}
                    ></img>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content font-bold bg-base-100 rounded-box z-1 mt-3 w-80 p-2 shadow font-[Poppins]"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>

                <li>
                  <a
                    onClick={() => {
                      auth.signOut();
                      setCurrentUser("");
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
