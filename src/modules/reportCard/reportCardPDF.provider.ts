import PDFDocument from 'pdfkit-table';
import type { ReportCardDTO } from './reportCard.dto.js';
import type { ReportCard } from './reportCard.entity.js';

export class ReportCardPdfProvider {
  generate(report: ReportCard): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      // PDFKitTable
      const doc = new PDFDocument({ 
        margin: 50,
        size: 'A4'
      });
      
      const buffers: Buffer[] = [];

      doc.on('data', chunk => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // --- Header ---
      doc.font('Helvetica-Bold').fontSize(18).text('Histórico Acadêmico', { align: 'center' });
      doc.moveDown(0.5);
      doc.font('Helvetica').fontSize(14).text(`${report.classInfo.semester}`, { align: 'center' });
      doc.moveDown(1.5);

      // --- Student Data ---
      doc.fontSize(12).text(`Aluno: ${report.student.name}`);
      doc.moveDown(0.5);
      doc.text(`Matrícula: ${report.student.registrationNumber}`);
      doc.moveDown(0.5);
      doc.text(`Disciplina: ${report.classInfo.name}`);
      doc.moveDown(2);

      // --- Table (pdfkit-table) ---
      const table = {
        title: "Detalhamento de Notas",
        // Column "Nota Final"
        headers: ["Avaliação", "Peso", "Nota (0-10)", "Nota Ponderada"],
        rows: report.evaluations.map(e => [
            e.type,
            e.weight.toFixed(1),
            // Column 3: Nota Original
            e.grade !== null ? e.grade.toFixed(1) : '-',
            // Column 4: Nota Ponderada (Novo)
            e.weightedGrade !== null ? e.weightedGrade.toFixed(1) : '-'
        ]),
      };

      // Table
      doc.table(table, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
        prepareRow: () => doc.font("Helvetica").fontSize(10),
      });

      // --- Footer ---
      doc.moveDown(2);
      doc.font('Helvetica-Bold').fontSize(12);
      doc.text(`Média Final: ${report.average}`, { align: 'right' });
      
      // Conditional coloring for status
      const statusColor = report.status === 'Aprovado' ? 'green' : (report.status === 'Reprovado' ? 'red' : 'orange');
      
      doc.fillColor(statusColor).text(`Situação: ${report.status}`, { align: 'right' });
      
      // Color and date reset
      doc.fillColor('black').moveDown(2);
      doc.fontSize(9).text(
        `Gerado em: ${report.generatedAt.toLocaleDateString()} às ${report.generatedAt.toLocaleTimeString()}`,
        { align: 'right' }
      );

      doc.end();
    });
  }
}
