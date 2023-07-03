import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
const convertHtmlToPdf = () => {
    const input = document.getElementById("template3-container")
    const pxWidth = 1920
    const pxHeight = 1080

    html2canvas(input, {
        width: pxWidth,
        height: pxHeight,
        scale: 1.8
    })
    .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF('portrait', 'px', [pxWidth, pxHeight]);
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("my-resume.pdf")
    })
}
export default convertHtmlToPdf;