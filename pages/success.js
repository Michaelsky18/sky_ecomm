import { useStateContext } from "@/context/StateContext";
import { runFireworks } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";


const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className=" success-wrapper">
      <div className=" success">
        <p className=" icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          {" "}
          If you have any questions, please email
          <a className="email" href="mailto:skyonline@gmail.com">
            skyonline@gmail.com
          </a>
          <Link href={"/"}>
            <button type="button" width="300px" className="btn">
              Continue Shopping
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Success;
