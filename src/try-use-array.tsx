import React, { useState } from "react";
import { useArray, useMount } from "utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "Naruto", age: 18 },
    { name: "Sakura", age: 20 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {});
  return (
    <div>
      <button onClick={() => add({ name: "Sasuki", age: 19 })}>
        add Sasuki
      </button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person: { name: string; age: number }, index: number) => (
        <div style={{ marginBottom: "30px" }}>
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
