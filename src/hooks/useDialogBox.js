import { useState } from "react";

const useDialogBox = (title) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openDialogBox = (_message) => {
    setMessage(_message);
    setIsDialogOpen(true);
  };

  const closeDialogBox = (callback = () => {}) => {
    callback();
    setIsDialogOpen(false);
  };

  return [isDialogOpen, title, message, openDialogBox, closeDialogBox];
};

export default useDialogBox;
