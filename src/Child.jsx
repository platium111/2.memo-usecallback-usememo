import React, { useEffect } from "react";

export default function Child(props) {
  console.log("Child");

  useEffect(() => {
    console.log("Run Child mount");
  });

  return <p>Child</p>;
}
