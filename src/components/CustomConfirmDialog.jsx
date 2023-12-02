import React, { useRef, useEffect } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

export const CustomConfirmDialog = ({ visible, onHide, onConfirm, message, header }) => {
  const confirmDialog = useRef(null);

  const footer = (
    <div className="p-grid p-justify-end">
      <Button label="Si" icon="pi pi-check-circle" rounded raised onClick={onConfirm} severity="success" />
      <Button label="No" icon="pi pi-times-circle" rounded raised onClick={onHide} severity="danger" />
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
