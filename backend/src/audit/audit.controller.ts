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
        // Validate that either content or URL is provided
        if ((!dto.content || dto.content.trim().length === 0) && (!dto.url || dto.url.trim().length === 0)) {
            return {
                error: 'Either content or URL is required for analysis',
            };
        }

        if (dto.url && dto.url.trim().length > 0) {
            try {
                new URL(dto.url);
            } catch (error) {
                return {
                    error: 'Invalid URL format',
                };
            }
        }

        return this.auditService.analyze({
            content: dto.content,
            url: dto.url,
            keyword: dto.keyword
        });
    }
}