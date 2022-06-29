import { Client } from "./client";
import { Template } from "./template";

export class Email {
    id!: number
    to: string[] = [];
    from: string = '';
    subject: string = '';
    message: string = '';
    title: string = '';
    recipients: Client[] = [];
    createdAt = Date();
    template = new Template();
}
