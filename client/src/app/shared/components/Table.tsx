"use client";
import React from 'react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

type RowData = {
  name: string;
  ecg_name: string;
};

export default function Table({ rowData }: { rowData: RowData[] }) {
  const columnDefs: ColDef[] = [
    { headerName: "Nome", field: "name", rowGroup: true, hide: true },
    { headerName: "ECG", field: "ecg_name" },
  ];

  console.log("rowData: ", rowData);

  return (
    <div className="ag-theme-alpine" style={{ height: "600px", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
      />
    </div>
  );
}