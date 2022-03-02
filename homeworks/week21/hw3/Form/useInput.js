/* eslint-disable import/no-unresolved, quotes, semi, comma-dangle */

import { useState, useCallback } from "react";

export default function useInput() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aware, setAware] = useState("");
  const [other, setOther] = useState("");
  const [signUp, setSignUp] = useState("");

  const handleInputChange = useCallback(
    (e) => {
      const input = e.target.value;
      const option = e.target.id;
      switch (e.target.name) {
        case "nickname":
          setNickname(input);
          break;
        case "email":
          setEmail(input);
          break;
        case "phone":
          setPhone(input);
          break;
        case "aware":
          setAware(input);
          break;
        case "other":
          setOther(input);
          break;
        case "signUp":
          setSignUp(
            option === "inBed"
              ? "躺在床上用想像力實作"
              : "趴在地上滑手機找現成的"
          );
          break;
      }
    },
    [setNickname, setPhone, setEmail, setAware, setOther, setSignUp]
  );

  return {
    nickname,
    email,
    phone,
    signUp,
    aware,
    other,
    handleInputChange,
  };
}
