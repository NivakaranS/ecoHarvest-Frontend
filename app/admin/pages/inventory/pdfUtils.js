export const generatePDF = async (elementId, fileName) => {
    const { jsPDF } = window.jspdf;
    const html2canvas = window.html2canvas;
    const element = document.getElementById(elementId);
    if (!element) return;

    const canvas = await html2canvas(element, {
        scale: 2,
        // ignore everything with class="no-print"
        ignoreElements: el => el.classList.contains('no-print'),
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: 'a4' });
    const props = pdf.getImageProperties(imgData);
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (props.height * pdfW) / props.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
    pdf.save(fileName);
};
