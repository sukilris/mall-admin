"use client";

import ProTable, { column } from "@/components/base/ProTable";

type Data = {
  id: string;
  name: string;
  position: string;
  office: string;
  age: string;
  startDate: string;
  salary: string;
};

const columns: column<Data>[] = [
  {
    title: "NAME",
    field: "name",
  },
  {
    title: "POSITION",
    field: "position",
  },
  {
    title: "OFFICE",
    field: "office",
  },
  {
    title: "AGE",
    field: "age",
  },
  {
    title: "START DATE",
    field: "startDate",
  },
  {
    title: "SALARY",
    field: "salary",
  },
];
const list = [
  {
    id: "1",
    name: "test",
    position: "test",
    office: "test",
    age: "test",
    startDate: "test",
    salary: "test",
  },
  {
    id: "2",
    name: "test",
    position: "test",
    office: "test",
    age: "test",
    startDate: "test",
    salary: "test",
  },
  {
    id: "3",
    name: "test",
    position: "test",
    office: "test",
    age: "test",
    startDate: "test",
    salary: "test",
  },
  {
    id: "4",
    name: "test",
    position: "test",
    office: "test",
    age: "test",
    startDate: "test",
    salary: "test",
  },
  {
    id: "5",
    name: "test",
    position: "test",
    office: "test",
    age: "test",
    startDate: "test",
    salary: "test",
  },
  {
    id: "6",
    name: "test",
    position: "test",
    office: "test",
    age: "test",
    startDate: "test",
    salary: "test",
  },
  {
    id: "7",
    name: "test",
    position: "test",
    office: "test",
    age: "test",
    startDate: "test",
    salary: "test",
  },
  {
    id: "8",
    name: "test",
    position: "test",
    office: "test",
    age: "test",
    startDate: "test",
    salary: "test",
  },
  {
    id: "9",
    name: "test",
    position: "test",
    office: "test",
    age: "test",
    startDate: "test",
    salary: "test",
  },
];
export default function Home() {
  const request = () => {
    return Promise.resolve({
      page: 1,
      size: 10,
      total: 100,
      list,
    });
  };
  return (
    <div className="mt-12 mb-6">
      <ProTable<Data>
        className="mb-6"
        title="Datatable Simple"
        description="A lightweight, extendable, dependency-free javascript HTML table plugin."
        filters={[1, 1, 1, 1, 1, 1, 1, 1]}
        columns={columns}
        request={request}
        rowKey="id"
      />
      <ProTable<Data>
        title="Datatable Simple"
        description="A lightweight, extendable, dependency-free javascript HTML table plugin."
        filters={[1, 1, 1, 1, 1, 1, 1, 1]}
        columns={columns}
        request={request}
        rowKey="id"
      />
    </div>
  );
}
