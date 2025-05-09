export const generatePDF = async (data, fileName, type = 'inventory') => {
    const { jsPDF } = await import('jspdf');
    const autoTable = (await import('jspdf-autotable')).default;

    const pdf = new jsPDF({ orientation: 'landscape' });

    // Header Title
    pdf.setFontSize(18);
    const title = type === 'vehicle' ? 'Vehicle Report' : 'Inventory Report';
    pdf.text(title, 14, 20);

    // Generated timestamp below title
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'medium' });
    pdf.setFontSize(10);
    pdf.text(`Generated on: ${formattedDate}`, 14, 28);

    // Table content
    const tableY = 36;
    if (type === 'vehicle') {
        autoTable(pdf, {
            startY: tableY,
            head: [['Plate Number', 'Type', 'Capacity (kg)', 'Status']],
            body: data.map(v => [
                v.plateNumber,
                v.type,
                v.capacityKg,
                v.status || 'N/A'
            ]),
        });
    } else {
        autoTable(pdf, {
            startY: tableY,
            head: [['Product', 'Category', 'Quantity', 'Vendor', 'Status']],
            body: data.map(i => [
                i.productName || i.name || 'N/A',
                i.category || 'N/A',
                i.quantity?.toString() || 'N/A',
                i.vendorName || i.vendor || 'N/A',
                i.status || 'N/A'
            ]),
        });
    }

    pdf.save(fileName);
};
