import { useEffect, useState } from "react";
import React from "react";

export interface User {
  name: string;
  id: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface searchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: searchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: searchPanelProps) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
