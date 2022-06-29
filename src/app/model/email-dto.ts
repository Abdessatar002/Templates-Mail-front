export class EmailDto {

    to: string[] = [];
    from: string = '';
    subject: string = '';

    templateId!: number;
    title: string = '';
    body: string = '';
}
