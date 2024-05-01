import { useState } from "react";

export default function useEditModal(){
    const [isOpenEdit, setisOpenEdit] = useState(false);
    const [index, setIndex] = useState(0);

  const toggleEdit = (index:number) => {
    setIndex(index);
    setisOpenEdit(!isOpenEdit);
  };

  return {
    index,
    isOpenEdit,
    toggleEdit
  };
}