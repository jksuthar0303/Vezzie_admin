import { saveAs } from 'file-saver';
import { useEffect, useRef, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import InvoicePDF from '../sections/@dashboard/order/details/InvoicePDF';
import { getOrderView } from '../Services/UserSer';
//
// import InvoicePDF from '../InvoicePDF';

export default function InvoiceDownload() {
  const { id } = useParams();
  const buttonRef = useRef(null);
  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchOrderView = async () => {
      try {
        const { data } = await getOrderView(id);
        console.log({ data });
        setOrders(data?.order);
      } catch (error) {
        console.log('Failed to fetch order', error);
      }
    };

    fetchOrderView();
  }, [id]);

  const currentOrder = orders?.find((order) => order?._id === id);

  const handleDownload = async () => {
    const blob = await pdf(<InvoicePDF invoice={currentOrder} />).toBlob();
    console.log({ blob });
    saveAs(blob, 'Invoice.pdf');
  };

  useEffect(() => {
    // Click the button when the component mounts
    if (buttonRef.current && currentOrder) {
      buttonRef.current.click();
    }
  }, [currentOrder, id]);
  return (
    <>
      {currentOrder && (
        <Button ref={buttonRef} onClick={handleDownload} sx={{ visibility: 'hidden' }}>
          Download Invoice
        </Button>
      )}
    </>
  );
}
