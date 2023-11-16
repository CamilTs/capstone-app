import React, { useRef, useEffect } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

export const CustomConfirmDialog = ({ visible, onHide, onConfirm, message, header }) => {
  const confirmDialog = useRef(null);

  const footer = (
    <div className="p-grid p-justify-end">
      <Button label="Si" icon="pi pi-check" raised onClick={onConfirm} className="p-button-success" />
      <Button label="No" icon="pi pi-times" raised onClick={onHide} className="p-button-danger" />
    </div>
  );

  return (
    <ConfirmDialog
      ref={confirmDialog}
      visible={visible}
      onHide={onHide}
      message={message}
      header={header || "Confirmación"}
      icon="pi pi-exclamation-triangle"
      footer={footer}
    ></ConfirmDialog>
  );
};
