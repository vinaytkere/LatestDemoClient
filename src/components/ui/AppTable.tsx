import { useEffect, useState } from 'react';
import { DataTable, type DataTablePageEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { AppButton } from './AppButton';

interface AppTableProps<T> {
    data: T[];
    totalRecords: number;
    columns: { field: keyof T; header: string }[];
    onEdit?: (rowData: T) => void;
    onDelete?: (rowData: T) => void;
    rowsPerPage?: number;
    pageNumber?: number;
    onPaginationChange?: (e: { pageNumber: number; pageSize: number }) => void;
    title?: string;
    enableFilter?: boolean;
}

export function AppTable<T extends { id?: string }>({
    data,
    totalRecords,
    columns,
    onEdit,
    onDelete,
    rowsPerPage = 5,
    pageNumber = 0,
    onPaginationChange,
    title = 'All Records',
    enableFilter = true,
}: AppTableProps<T>) {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [first, setFirst] = useState(pageNumber * rowsPerPage);

    useEffect(() => {
        setFirst(pageNumber * rowsPerPage);
    }, [pageNumber, rowsPerPage]);

    const handlePageChange = (e: DataTablePageEvent) => {
        const newPageNumber = e.page ?? 0;
        const newPageSize = e.rows;

        setFirst(newPageNumber * newPageSize);

        if (onPaginationChange) {
            onPaginationChange({
                pageNumber: newPageNumber,
                pageSize: newPageSize,
            });
        }
    };

    return (
        <div className="card">
            <Panel header={title}>
                {enableFilter && (
                    <div className="mb-4 flex justify-end">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText
                                type="search"
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Search..."
                                className="p-inputtext-sm"
                            />
                        </span>
                    </div>
                )}

                <DataTable
                    value={data}
                    paginator
                    stripedRows
                    showGridlines
                    responsiveLayout="scroll"
                    globalFilter={globalFilter}
                    filters={{ global: { value: globalFilter, matchMode: 'contains' } }}
                    first={first}
                    rows={rowsPerPage}
                    totalRecords={totalRecords}
                    onPage={handlePageChange}
                    lazy
                    className="p-datatable-sm"
                >
                    {columns.map((col) => (
                        <Column
                            key={String(col.field)}
                            field={String(col.field)}
                            header={col.header}
                            filter={enableFilter}
                            filterPlaceholder={`Search ${col.header.toLowerCase()}...`}
                            sortable
                        />
                    ))}

                    {(onEdit || onDelete) && (
                        <Column
                            header="Actions"
                            body={(row: T) => (
                                <div className="flex gap-2">
                                    {onEdit && (
                                        <AppButton
                                            label="Edit"
                                            icon="pi pi-pencil"
                                            onClick={() => onEdit(row)}
                                        />
                                    )}
                                    {onDelete && (
                                        <AppButton
                                            label="Delete"
                                            icon="pi pi-trash"
                                            className="p-button-danger"
                                            onClick={() => onDelete(row)}
                                        />
                                    )}
                                </div>
                            )}
                        />
                    )}
                </DataTable>
            </Panel>
        </div>
    );
}