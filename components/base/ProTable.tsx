import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IconButton, Pagination, PaginationItem, Tooltip } from "@mui/material";
import {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAsyncEffect } from "ahooks";

export type Filter = {};
export type column<T> = {
  title?: ReactNode;
  field: keyof T;
};
type ListResult<T> = {
  page: number;
  size: number;
  total: number;
  list: T[];
};
type Props<T, U> = {
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  renderTitle?: () => ReactNode;
  filters?: Filter[];
  columns: column<T>[];
  request: (params?: U) => Promise<ListResult<T>>;
  rowKey?: keyof T;
};
type TableHandle = {
  reload: () => void;
  reset: () => void;
};

function ProTable<T extends {} = {}, U extends {} = {}>(
  {
    className,
    title,
    description,
    renderTitle,
    filters,
    columns,
    request,
    rowKey,
  }: Props<T, U>,
  ref: ForwardedRef<TableHandle>
) {
  const [filterParent] = useAutoAnimate();
  const [list, setList] = useState<T[]>([]);
  const search = () => {};
  const reload = () => {};
  const reset = () => {};
  useImperativeHandle(ref, () => ({
    reload,
    reset,
  }));
  useAsyncEffect(async () => {
    const res = await request();
    setList(res.list);
  }, []);
  return (
    <div className={`shadow rounded-xl bg-white ${className}`}>
      <div>
        <div className="flex items-center justify-between p-6">
          {renderTitle?.() || (
            <div>
              <h5 className="text-xl text-[rgb(52,71,103)] m-0">{title}</h5>
              <div className="text-sm text-[rgb(123,128,154)]">
                {description}
              </div>
            </div>
          )}
          <div className="flex items-center justify-end">
            <Tooltip title="Search" placement="top" arrow>
              <IconButton className="ml-4" onClick={search}>
                <SearchRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reload" placement="top" arrow>
              <IconButton className="ml-4" onClick={reload}>
                <CachedRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reset" placement="top" arrow>
              <IconButton className="ml-4" onClick={reset}>
                <RestartAltRoundedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <div>
        <div ref={filterParent} className="grid grid-cols-4 p-6">
          {filters?.map((item, index) => {
            return <div key={index}></div>;
          })}
        </div>
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
              {list.map((item, index) => {
                return (
                  <TableRow
                    key={rowKey ? (item[rowKey] as string) : index}
                    hover
                  >
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
        <div className="flex items-center justify-between p-6 h-[84px]">
          <div className="text-sm text-[rgb(123,128,154)]">
            Showing 1 to 10 of 57 entries
          </div>
          <div>
            <Pagination
              count={10}
              color="primary"
              renderItem={(item) => (
                <PaginationItem
                  classes={{
                    selected: "bg-blue-500 shadow-lg shadow-blue-500/50",
                  }}
                  {...item}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(ProTable);
