// import { ApiProperty } from "@nestjs/swagger";

// export class CreateCityDto {

//     @ApiProperty()
//     content: string;

// }



import { ApiProperty } from '@nestjs/swagger';

export class CreateAuditDto {
    @ApiProperty()
    content?: string;

    @ApiProperty()
    keyword?: string;

    @ApiProperty()
    url?: string;
}
