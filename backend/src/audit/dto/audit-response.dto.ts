// export class AuditResponseDto {
//     id: number;
//     inputContent: string;

//     grammarScore: number;
//     grammarIssues: string;
//     grammarSuggestions: string;

//     readabilityScore: number;
//     readabilityIssues: string;
//     readabilitySuggestions: string;

//     clarityScore: number;
//     clarityIssues: string;
//     claritySuggestions: string;

//     structureScore: number;
//     structureIssues: string;
//     structureSuggestions: string;

//     createdAt: Date;
// }





// export class AuditResponseDto {
//     id: number;

//     content: string;
//     keyword?: string;

//     seo: any;
//     serp: any;
//     aeo: any;
//     humanization: any;
//     differentiation: any;
//     readability: any;
//     grammar: any;
//     clarity: any;
//     structure: any;

//     overallScore: number;
//     createdAt: Date;
// }






import { ApiProperty } from '@nestjs/swagger';

export class AuditResponseDto {
    @ApiProperty()
    id: number | null;
    @ApiProperty()
    content: string;
    @ApiProperty()
    keyword?: string;
    @ApiProperty()
    overallScore: number;
    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    seo: any;
    @ApiProperty()
    serp: any;
    @ApiProperty()
    aeo: any;
    @ApiProperty()
    humanization: any;
    @ApiProperty()
    differentiation: any;
    @ApiProperty()
    readability: any;
    @ApiProperty()
    grammar: any;
    @ApiProperty()
    clarity: any;
    @ApiProperty()
    structure: any;
}
