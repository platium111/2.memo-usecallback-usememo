import React, { memo, useEffect } from "react";
import Child from "./Child";

function Parent(props) {
  console.log("Parent");
  
  useEffect(() => {
    console.log("Run Parent mount");
  });

  return <Child name="is child"></Child>;
}

export default memo(Parent);
