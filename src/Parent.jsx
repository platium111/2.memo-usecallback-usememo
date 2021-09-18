import React, { memo } from "react";
import Child from "./Child";

function Parent(props) {
  console.log("Parent");
  return <Child name="is child"></Child>;
}

export default memo(Parent);
