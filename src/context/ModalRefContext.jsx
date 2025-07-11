import React, { useRef, useContext } from "react";
const ModalRef = React.createContext({ children });
function ModalRefContext() {
  const modalRef = useRef(null);
  return <div>{children}</div>;
}

export default ModalRefContext;
