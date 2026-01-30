import type { Request, Response } from 'express';
import { ReportCardService } from './reportCard.service.js';
import { EnrollmentRepository } from '../enrollment/enrollment.repository.js';
import { GradeRepository } from '../evaluationGrade/evalGrade.repository.js';
import { EvaluationRepository } from '../evaluation/evaluation.repository.js';
import { getStringParam } from '../../shared/http/params.js';
import { ReportCardPdfProvider } from './reportCard-pdf.provider.js';
import { ReportCardMapper } from './reportCard.mapper.js';

export class ReportCardController {
    // Injeção de Dependências
    private service = new ReportCardService(
        new EnrollmentRepository(), 
        new GradeRepository(), 
        new EvaluationRepository()
    );
    private pdfProvider = new ReportCardPdfProvider();

    // Retorna JSON (usa Mapper)
    generate = async (req: Request, res: Response): Promise<Response> => {
        const id = getStringParam(req, 'id'); // enrollmentId
        
        const reportEntity = await this.service.generate(id);
        const responseDTO = ReportCardMapper.toResponse(reportEntity);

        return res.json(responseDTO);
    }

    // Retorna PDF (Usa Provider)
    generatePdf = async (req: Request, res: Response): Promise<Response> => {
        const id = getStringParam(req, 'id');

        const reportEntity = await this.service.generate(id);
        // O PDF Provider sabe ler a Entidade
        const pdfBuffer = await this.pdfProvider.generate(reportEntity);

        return res
            .setHeader('Content-Type', 'application/pdf')
            .setHeader('Content-Disposition', 'inline; filename=boletim.pdf')
            .status(200)
            .send(pdfBuffer);
    };
}