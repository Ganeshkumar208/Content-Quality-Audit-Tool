// // src/audit/audit.controller.ts
// import { Controller, Post, Body } from '@nestjs/common';
// import { AuditService } from './audit.service';

// @Controller('audit')
// export class AuditController {
//     constructor(private readonly auditService: AuditService) { }

//     @Post('run')
//     async runAudit(@Body() dto: { content: string }) {
//         return this.auditService.runFullAudit(dto.content);
//     }
// }








import { Controller, Post, Body } from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateAuditDto } from './dto/create-audit.dto';

@Controller('audit')
export class AuditController {
    constructor(private readonly auditService: AuditService) { }

    @Post('analyze')
    async analyze(@Body() dto: CreateAuditDto) {

        if (!dto.content || dto.content.trim().length === 0) {
            return {
                error: 'Content is required for analysis',
            };
        }

        return this.auditService.analyzeContent(dto.content, dto.keyword);
    }
}
