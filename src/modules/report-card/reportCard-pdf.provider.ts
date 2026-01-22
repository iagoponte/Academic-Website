import PDFDocument from 'pdfkit';
import type { ReportCardDTO } from './reportCard.dto.js';

export class ReportCardPdfProvider {
  generate(report: ReportCardDTO): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ 
        margin: 50,
      });
      const buffers: Buffer[] = [];

      
      doc.on('data', chunk => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      doc.font('Times-Roman');
      doc.fontSize(18).text('Histórico Acadêmico', { align: 'center' });
      // doc.moveDown();
      doc.fontSize(14).text(`${report.class.semester}`, { align: 'center' });

      doc.fontSize(12).text(`Aluno: ${report.student.name}`);
      doc.moveDown(0.5);
      doc.text(`Matrícula: ${report.student.registrationNumber}`);
      doc.moveDown(0.5);
      doc.text(`Disciplina: ${report.class.name}`);

      doc.moveDown(2);
      // doc.fontSize(14).text('Avaliações:');
      doc.moveDown(1);

      doc.table({
        rowStyles: (i) => {
          return i < 1 
          ? { border: [0, 0, 2, 0], borderColor: "black", align: 'center' }
          : { border: [0, 0, 1, 0], borderColor: "#aaa", align: 'center'}; 
        },
        data: [
          ['Avaliação', 'Peso', 'Nota' ],
          ...report.evaluations.map(e => [
            e.type,
            e.weight.toString(),
            e.grade !== null ? e.grade.toString() : '-'
          ])
        ]
      });

      doc.moveDown(3);
      doc.text(`Média Final: ${report.average}`, { align: 'right' });
      doc.text(`Situação: ${report.status}`, { align: 'right' });

      doc.moveDown();
      doc.fontSize(10).text(
        `Gerado em: ${report.generatedAt.toLocaleDateString()}`,
        { align: 'right' }
      );

      doc.end();
    });
  }
}
