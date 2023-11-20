import React from "react";
type props = {
  link: links;
};

const SubscribeNow = ({ link: { label, href } }: props) => {
  return (
    <>
      <form action={href} className="SubscribeNow">
        <input
          type="text/email"
          name=""
          placeholder="Your Email Adress"
          id="subscribeNowInput"
        />
        <button>
          {label}
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </button>
      </form>
    </>
  );
};

export default SubscribeNow;
