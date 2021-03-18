import { Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useState } from "react";

const ColorTable = () => {
  let data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "ققق Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  const [list, setList] = useState(data);

  const hadnleChange = (e) => {
    let serachArray = data.filter(
      (item) => item.name.toLowerCase().includes(e.target.value) == true
    );

    setList(serachArray);
  };
  return (
    <div>
      <input type="text" onChange={hadnleChange} />
      <Table dataSource={list}>
        <Column title="نام" dataIndex="name" key="name" />
        <Column title="اسلاگ" dataIndex="age" key="slug" />
        <Column title="دسته مادر" dataIndex="address" />
      </Table>
    </div>
  );
};

export default ColorTable;
