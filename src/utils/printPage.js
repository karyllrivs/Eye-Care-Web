import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const printPage = (input, title) => {
  removeLastColumn(input);

  const loadImages = () => {
    return new Promise((resolve) => {
      const images = input.getElementsByTagName("img");
      let loadedCount = 0;
      if (images.length === 0) {
        resolve();
      }
      for (let i = 0; i < images.length; i++) {
        if (images[i].complete) {
          loadedCount++;
          if (loadedCount === images.length) {
            resolve();
          }
        } else {
          images[i].onload = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              resolve();
            }
          };
        }
      }
    });
  };

  loadImages().then(() => {
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add header title
      pdf.setFontSize(18);
      pdf.text(title, 10, 10);

      // Add printed date
      pdf.setFontSize(12);
      const date = new Date().toLocaleString();
      pdf.text(`Printed on: ${date}`, 10, 20);

      // Add the image
      pdf.addImage(imgData, "PNG", 10, 30, imgWidth - 20, imgHeight);
      heightLeft -= pageHeight - 40; // Adjust for header

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth - 20, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${title}.pdf`);
      window.location.reload();
    });
  });
};

const removeLastColumn = (input) => {
  const table = input.querySelector("table");
  if (table) {
    const rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td, th");
      if (cells.length > 0) {
        const lastCell = cells[cells.length - 1];
        lastCell.remove();
      }
    });
  }
};
