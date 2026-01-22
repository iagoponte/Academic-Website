import type { Request, Response } from 'express';
import { ReportCardService } from './reportCard.service.js';
import { EnrollmentRepository } from '../enrollment/enrollment.repository.js';
import { GradeRepository } from '../evaluationGrade/evalGrade.repository.js';
import { EvaluationRepository } from '../evaluation/evaluation.repository.js';
import { getStringParam } from '../../shared/http/params.js';
import { ReportCardPdfProvider } from './reportCard-pdf.provider.js';

export class ReportCardController {
    private service = new ReportCardService(new EnrollmentRepository(), new GradeRepository(), new EvaluationRepository());
    private pdfProvider = new ReportCardPdfProvider();

  generate = async (req: Request, res: Response): Promise<Response> => {
    const id = getStringParam(req, 'id');
    const reportCard = await this.service.generate(id);

    return res.json(reportCard);
  }

  generatePdf = async (req: Request, res: Response): Promise<Response> => {
    const id = getStringParam(req, 'id');

    const reportCard = await this.service.generate(id);
    const pdfBuffer = await this.pdfProvider.generate(reportCard);

    return res
      .setHeader('Content-Type', 'application/pdf')
      .setHeader('Content-Disposition', 'inline; filename=boletim.pdf')
      .status(200)
      .send(pdfBuffer);
  };
}
