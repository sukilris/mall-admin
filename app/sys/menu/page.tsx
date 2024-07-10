"use client";

import ProTable, { column } from "@/components/base/ProTable";
import { getPermmenuList } from "@/services/permmenu";
import { SysPermMenuItemRespDto } from "@/types/sys";

const columns: column<SysPermMenuItemRespDto>[] = [
  {
    title: "NAME",
    field: "name",
  },
];
export default function Home() {
  const request = () => {
    return getPermmenuList();
  };
  return (
    <div className="mt-12 mb-6">
      <ProTable<SysPermMenuItemRespDto>
        className="mb-6"
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
