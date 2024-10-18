import html2canvas from "html2canvas";
import jsPDF from "jspdf";
 
export const printPage = (input, title) => {
  const rowsPerPage = 35; // Set the limit of rows per page
 
  removeLastColumn(input); // Optional: removing the last column from the table
 
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
    const table = input.querySelector("table");
    if (!table) return; // Exit if no table exists
 
    const rows = Array.from(table.querySelectorAll("tr"));
    const totalPages = Math.ceil(rows.length / rowsPerPage); // Calculate total number of pages
    const pdf = new jsPDF();
 
    let page = 1; // Start with page 1
    let position = 30; // Starting position for the first page (after header)
 
    // This function processes each page by adding rows per page
    const processPage = (pageIndex) => {
      return new Promise((resolve) => {
        const pageRows = rows.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage); // Get rows for this page
 
        // Create a temporary table with the rows for the current page
        const tempDiv = document.createElement("div");
        const tempTable = document.createElement("table");
        tempTable.style.width = "100%";
 
        pageRows.forEach((row) => {
          tempTable.appendChild(row.cloneNode(true)); // Clone the row to avoid modifying the original table
        });
        tempDiv.appendChild(tempTable);
        document.body.appendChild(tempDiv); // Append the temp div to the body for html2canvas to capture
 
        // Capture the table content using html2canvas
        html2canvas(tempDiv, { useCORS: true }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
 
          if (pageIndex > 0) {
            pdf.addPage(); // Add a new page for each section after the first
          }
 
          // Add header title on each page
          pdf.setFontSize(18);
          pdf.text(title, 10, 10);
 
          // Add printed date on each page
          pdf.setFontSize(12);
          const date = new Date().toLocaleString();
          pdf.text(`Printed on: ${date}`, 10, 20);
 
          // Add page number on each page
          pdf.setFontSize(10);
          pdf.text(`Page ${page} of ${totalPages}`, pdf.internal.pageSize.getWidth() - 30, 20);
          page++;
 
          // Add the captured image to the PDF
          pdf.addImage(imgData, "PNG", 10, position, imgWidth - 20, imgHeight);
 
          // Clean up the temporary div after use
          document.body.removeChild(tempDiv);
 
          resolve(); // Resolve the promise when the page is processed
        });
      });
    };
 
    // Process all pages sequentially using async/await
    const processPages = async () => {
      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        await processPage(pageIndex); // Wait for each page to be processed before moving to the next
      }
      pdf.save(`${title}.pdf`); // Save the generated PDF after all pages are processed
      window.location.reload(); // Reload the window after saving the PDF
    };
 
    processPages(); // Start processing the pages
  });
};
 
// Function to remove the last column from the table (optional)
const removeLastColumn = (input) => {
  const table = input.querySelector("table");
  if (table) {
    const rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td, th");
      if (cells.length > 0) {
        const lastCell = cells[cells.length - 1];
        lastCell.remove(); // Remove the last column cell
      }
    });
  }
};
 