import { useState } from "react";
import {
    ColumnDef,
    SortingState,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

// ✅ Define the interface for props
interface TableProps<TData> {
    columns: ColumnDef<TData>[]; // Columns definition
    data: TData[]; // Data to be displayed
    containerClassname?: string; // Optional class for styling
    heading?: string; // Optional table heading
    showPagination?: boolean; // Show pagination or not
}

function TableHOC<TData>({
    columns,
    data,
    containerClassname,
    heading,
    showPagination = false,
}: TableProps<TData>) {
    return function HOC() {
        const [sorting, setSorting] = useState<SortingState>([]);
        const [pagination, setPagination] = useState({
            pageIndex: 0,
            pageSize: 5,
        });

        const table = useReactTable({
            data,
            columns,
            state: { sorting, pagination },
            onSortingChange: setSorting,
            onPaginationChange: setPagination,
            getCoreRowModel: getCoreRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
        });

        return (
            <div className={containerClassname}>
                {heading && <h2 className="heading">{heading}</h2>}

                <table className="table">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {
                                            header.column.columnDef
                                                .header as string
                                        }
                                        {header.column.getIsSorted() === "asc"
                                            ? " 🔼"
                                            : header.column.getIsSorted() ===
                                              "desc"
                                            ? " 🔽"
                                            : ""}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {cell.renderValue() as React.ReactNode}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showPagination && (
                    <div className="tablePagination">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Prev
                        </button>
                        <span>
                            Page {pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </span>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        );
    };
}

export default TableHOC;
