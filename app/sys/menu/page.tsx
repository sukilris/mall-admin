"use client";

import { column } from "@/components/base/ProTable";
import { getPermmenuList } from "@/services/permmenu";
import { SysPermMenuItemRespDto } from "@/types/sys";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

const columns: column<SysPermMenuItemRespDto>[] = [
  {
    title: "NAME",
    field: "name",
  },
];

type PermmenuTree = SysPermMenuItemRespDto & {
  children?: PermmenuTree[];
};
export default function Home() {
  const [permmenuTree, setPermmenuTree] = useState<PermmenuTree[]>([]);
  const createPermmenuTree = (list: SysPermMenuItemRespDto[]) => {
    const map = new Map<number, PermmenuTree>();
    list.forEach((item) => {
      map.set(item.id, item);
    });
    list.forEach((item) => {
      if (item.parentId && map.has(item.parentId)) {
        const parent = map.get(item.parentId);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(item);
        }
      }
    });
    return list.filter((item) => item.parentId === 0);
  };
  useEffect(() => {
    getPermmenuList().then((res) => {
      setPermmenuTree(createPermmenuTree(res.data?.list || []));
    });
  }, []);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow hover>
            {columns.map(({ title, field }) => {
              return (
                <TableCell
                  key={field as string}
                  className="text-xs text-[rgb(123,128,154)] font-bold px-6 py-3 h-12"
                >
                  {title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {permmenuTree.map((item) => {
            return (
              <TableRow key={item.id} hover>
                {columns.map(({ field }) => {
                  return (
                    <TableCell
                      key={field as string}
                      className="text-sm text-[rgb(123,128,154)] px-6 py-3 h-12"
                    >
                      {item[field] as string}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
